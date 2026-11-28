# Copyright (c) 2026, Renaud Allard <renaud@allard.it>
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#
# 1. Redistributions of source code must retain the above copyright notice,
#    this list of conditions and the following disclaimer.
#
# 2. Redistributions in binary form must reproduce the above copyright notice,
#    this list of conditions and the following disclaimer in the documentation
#    and/or other materials provided with the distribution.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
# AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
# IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
# ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
# LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
# CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
# SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
# INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
# CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
# ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
# POSSIBILITY OF SUCH DAMAGE.

"""What a volume of water drawn over a closed run of days cost, priced here.

For the bill_cost action, which a utility's bill is held against. The days
are counted with both ends included: a bill from 20 November to 18
November of the next year is 364 days, where inBW prints 363, the end
minus the start.

Each day is billed on the card in force that day: the entry's card when
its validity holds the day, else the card archive's row of that month when
its own validity does, else the entry's card stands in and the month is
named. Days in a row on one card make a period. The volume is spread over
the days evenly, and each period is billed with its annual allowances and
fees counted for its share of a 365-day year.
"""

from __future__ import annotations

import math
from dataclasses import dataclass
from datetime import date, timedelta
from typing import TYPE_CHECKING

import voluptuous as vol
from homeassistant.core import HomeAssistant, ServiceCall, ServiceResponse, SupportsResponse
from homeassistant.exceptions import HomeAssistantError, ServiceValidationError
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.service import async_register_admin_service
from homeassistant.util.json import JsonValueType

from ._redact import sensitive_tokens
from .const import (
    CONF_CARD_ARCHIVE,
    CONF_PERSONS,
    CONF_SOCIAL_TARIFF,
    DEFAULT_CARD_ARCHIVE,
    DEFAULT_PERSONS,
    DOMAIN,
)
from .coordinator import entry_coordinator, loaded_entries
from .pricing import period_cost
from .providers import _archive
from .providers.base import TransientFetchError, WaterTariff, belgian_today
from .sensor import _publication_label_without_commune

if TYPE_CHECKING:
    from .coordinator import WaterConfigEntry, WaterCoordinator

SERVICE_BILL_COST = "bill_cost"


def _finite(value: float) -> float:
    if not math.isfinite(value):
        raise vol.Invalid("not a finite number")
    return value


BILL_COST_SCHEMA = vol.Schema(
    {
        vol.Required("entry_id"): cv.string,
        vol.Required("start"): cv.date,
        vol.Required("end"): cv.date,
        vol.Required("volume"): vol.All(vol.Coerce(float), _finite, vol.Range(min=0.0)),
    }
)


def _invalid(key: str, **placeholders: str) -> ServiceValidationError:
    return ServiceValidationError(
        translation_domain=DOMAIN, translation_key=key, translation_placeholders=placeholders
    )


def _failed(key: str, **placeholders: str) -> HomeAssistantError:
    return HomeAssistantError(
        translation_domain=DOMAIN, translation_key=key, translation_placeholders=placeholders
    )


def earliest_bill_day(today: date) -> date:
    """The first day a bill can start on: 1 January two years back, so a
    yearly bill is priced until the next one comes."""
    return date(today.year - 2, 1, 1)


def check_window(start: date, end: date, today: date) -> None:
    """Refuse a window that is not a closed run of days the cards reach."""
    if end < start:
        raise _invalid("window_reversed")
    if end >= today:
        raise _invalid("window_not_closed")
    earliest = earliest_bill_day(today)
    if start < earliest:
        raise _invalid("bill_start_too_early", earliest=earliest.isoformat())


def _holds(card: WaterTariff, day: date) -> bool:
    return card.valid_from <= day and (card.valid_until is None or day <= card.valid_until)


@dataclass
class _Period:
    card: WaterTariff
    stand_in: bool
    start: date
    end: date


async def _archived_card(coordinator: WaterCoordinator, month: date) -> WaterTariff | None:
    """The card the archive holds for the entry's utility and commune in
    ``month``, None when it holds none."""
    session = async_get_clientsession(coordinator.hass)
    try:
        row = await _archive.archived_row(
            session, coordinator._extractor.id, coordinator.archive_key(), month
        )
    except TransientFetchError as err:
        # The month may well be held; the archive just did not say, and
        # standing the card in for it would bill the days on a guess.
        raise _failed("archive_unreachable") from err
    if row is None:
        return None
    try:
        return coordinator.archived_tariff(row)
    except (KeyError, TypeError, ValueError):
        return None


async def _periods(
    coordinator: WaterCoordinator, start: date, end: date
) -> tuple[list[_Period], list[JsonValueType]]:
    """The window's days in runs on one card, and the months the entry's
    card stands in for."""
    snapshot = coordinator.data.tariff
    archive = coordinator.entry.options.get(CONF_CARD_ARCHIVE, DEFAULT_CARD_ARCHIVE)
    months: dict[date, WaterTariff | None] = {}
    periods: list[_Period] = []
    stand_ins: list[JsonValueType] = []
    day = start
    while day <= end:
        card, stand_in = snapshot, False
        if not _holds(snapshot, day):
            month = day.replace(day=1)
            if month not in months:
                months[month] = await _archived_card(coordinator, month) if archive else None
            archived = months[month]
            if archived is not None and _holds(archived, day):
                card = archived
            else:
                stand_in = True
                named = f"{month:%Y-%m}"
                if named not in stand_ins:
                    stand_ins.append(named)
        last = periods[-1] if periods else None
        if last is not None and last.card == card and last.stand_in == stand_in:
            last.end = day
        else:
            periods.append(_Period(card, stand_in, day, day))
        day += timedelta(days=1)
    return periods, stand_ins


async def window_cost(
    entry: WaterConfigEntry, start: date, end: date, volume: float
) -> dict[str, JsonValueType]:
    """What ``volume`` m³ drawn from ``start`` to ``end``, both included,
    cost, VAT included, with each period's card and the months the
    entry's card stood in for."""
    check_window(start, end, belgian_today())
    coordinator = entry_coordinator(entry)
    if coordinator is None or coordinator.data is None:
        raise _failed("nothing_priced_yet")
    snapshot = coordinator.data.tariff
    persons = int(entry.options.get(CONF_PERSONS, DEFAULT_PERSONS))
    social = bool(entry.options.get(CONF_SOCIAL_TARIFF, False))
    tokens = sensitive_tokens(entry)
    days = (end - start).days + 1
    total = 0.0
    periods, stand_ins = await _periods(coordinator, start, end)
    out: list[JsonValueType] = []
    for period in periods:
        card = period.card
        span = (period.end - period.start).days + 1
        share = volume * span / days
        cost = period_cost(card, share, span, persons, social_tariff=social)
        fixed = period_cost(card, 0.0, span, persons, social_tariff=social)
        if cost is None or fixed is None:
            raise _failed(
                "window_not_priced",
                start=period.start.isoformat(),
                end=period.end.isoformat(),
            )
        total += cost
        out.append(
            {
                "start": period.start.isoformat(),
                "end": period.end.isoformat(),
                "days": span,
                "volume": round(share, 3),
                "stand_in": period.stand_in,
                "valid_from": card.valid_from.isoformat(),
                "valid_until": None if card.valid_until is None else card.valid_until.isoformat(),
                "publication_label": _publication_label_without_commune(
                    card.publication_label, tokens
                ),
                "vat_rate": card.vat_rate,
                "yearly_fixed_fee": card.yearly_fixed_fee,
                "yearly_fixed_fee_per_resident_discount": (
                    card.yearly_fixed_fee_per_resident_discount
                ),
                "cvd_eur_per_m3": card.cvd_eur_per_m3,
                "cva_eur_per_m3": card.cva_eur_per_m3,
                "fse_eur_per_m3": card.fse_eur_per_m3,
                "basis_eur_per_m3": card.basis_eur_per_m3,
                "comfort_eur_per_m3": card.comfort_eur_per_m3,
                "linear_eur_per_m3": card.linear_eur_per_m3,
                "sanering_bovengemeentelijk_eur_per_m3": (
                    card.sanering_bovengemeentelijk_eur_per_m3
                ),
                "sanering_gemeentelijk_eur_per_m3": card.sanering_gemeentelijk_eur_per_m3,
                "fixed": round(fixed, 2),
                "volumetric": round(cost - fixed, 2),
                "cost": round(cost, 2),
            }
        )
    return {
        "start": start.isoformat(),
        "end": end.isoformat(),
        "days": days,
        "volume": volume,
        "utility": snapshot.utility,
        "region": snapshot.region,
        "cost": round(total, 2),
        "months_on_stand_in_card": stand_ins,
        "periods": out,
    }


def async_register_bill_cost(hass: HomeAssistant) -> None:
    """Register the ``bill_cost`` action, once for the integration.

    For administrators only: every call can ask the card archive for each
    month of the window. It only answers and changes nothing. A call with
    no user, as an automation's is, still goes through.
    """

    async def _bill_cost(call: ServiceCall) -> ServiceResponse:
        (entry,) = loaded_entries(hass, call.data["entry_id"])
        return await window_cost(entry, call.data["start"], call.data["end"], call.data["volume"])

    async_register_admin_service(
        hass,
        DOMAIN,
        SERVICE_BILL_COST,
        _bill_cost,
        schema=BILL_COST_SCHEMA,
        supports_response=SupportsResponse.ONLY,
    )
