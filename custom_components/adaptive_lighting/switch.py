"""Switch for the Adaptive Lighting integration."""
from __future__ import annotations

import asyncio
import bisect
from copy import deepcopy
from dataclasses import dataclass
import datetime
from datetime import timedelta
import logging
from typing import Dict, List, Optional, Tuple, Union

import astral
import voluptuous as vol

from homeassistant.components.light import (
    ATTR_BRIGHTNESS_PCT,
    ATTR_COLOR_TEMP,
    ATTR_RGB_COLOR,
    ATTR_TRANSITION,
    DOMAIN as LIGHT_DOMAIN,
    SUPPORT_BRIGHTNESS,
    SUPPORT_COLOR,
    SUPPORT_COLOR_TEMP,
    SUPPORT_TRANSITION,
    VALID_TRANSITION,
    is_on,
)
from homeassistant.components.switch import DOMAIN as SWITCH_DOMAIN, SwitchEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    ATTR_DOMAIN,
    ATTR_ENTITY_ID,
    ATTR_SERVICE,
    ATTR_SERVICE_DATA,
    CONF_NAME,
    EVENT_CALL_SERVICE,
    EVENT_HOMEASSISTANT_START,
    SERVICE_TURN_OFF,
    SERVICE_TURN_ON,
    STATE_ON,
    SUN_EVENT_SUNRISE,
    SUN_EVENT_SUNSET,
)
from homeassistant.core import Context, Event, ServiceCall, callback
from homeassistant.helpers import entity_platform
import homeassistant.helpers.config_validation as cv
from homeassistant.helpers.event import (
    async_track_state_change_event,
    async_track_time_interval,
)
from homeassistant.helpers.restore_state import RestoreEntity
from homeassistant.helpers.sun import get_astral_location
from homeassistant.util import slugify
from homeassistant.util.color import (
    color_RGB_to_xy,
    color_temperature_kelvin_to_mired,
    color_temperature_to_rgb,
    color_xy_to_hs,
)
import homeassistant.util.dt as dt_util

from .const import (
    ATTR_TURN_ON_OFF_LISTENER,
    CONF_ADAPT_BRIGHTNESS,
    CONF_ADAPT_COLOR_TEMP,
    CONF_ADAPT_RGB_COLOR,
    CONF_DISABLE_ENTITY,
    CONF_DISABLE_STATE,
    CONF_INITIAL_TRANSITION,
    CONF_INTERVAL,
    CONF_LIGHTS,
    CONF_MAX_BRIGHTNESS,
    CONF_MAX_COLOR_TEMP,
    CONF_MIN_BRIGHTNESS,
    CONF_MIN_COLOR_TEMP,
    CONF_ONLY_ONCE,
    CONF_PREFER_RGB_COLOR,
    CONF_SLEEP_BRIGHTNESS,
    CONF_SLEEP_COLOR_TEMP,
    CONF_SLEEP_ENTITY,
    CONF_SLEEP_STATE,
    CONF_SUNRISE_OFFSET,
    CONF_SUNRISE_TIME,
    CONF_SUNSET_OFFSET,
    CONF_SUNSET_TIME,
    CONF_TAKE_OVER_CONTROL,
    CONF_TRANSITION,
    CONF_TURN_ON_LIGHTS,
    DOMAIN,
    EXTRA_VALIDATION,
    ICON,
    SERVICE_APPLY,
    SUN_EVENT_MIDNIGHT,
    SUN_EVENT_NOON,
    TURNING_OFF_DELAY,
    VALIDATION_TUPLES,
    replace_none_str,
)

_SUPPORT_OPTS = {
    "brightness": SUPPORT_BRIGHTNESS,
    "color_temp": SUPPORT_COLOR_TEMP,
    "color": SUPPORT_COLOR,
    "transition": SUPPORT_TRANSITION,
}

_ORDER = (SUN_EVENT_SUNRISE, SUN_EVENT_NOON, SUN_EVENT_SUNSET, SUN_EVENT_MIDNIGHT)
_ALLOWED_ORDERS = {_ORDER[i:] + _ORDER[:i] for i in range(len(_ORDER))}

_LOGGER = logging.getLogger(__name__)

SCAN_INTERVAL = timedelta(seconds=10)


async def handle_apply(switch: AdaptiveSwitch, service_call: ServiceCall):
    """Handle the entity service apply."""
    if not isinstance(switch, AdaptiveSwitch):
        raise ValueError("Apply can only be called for a AdaptiveSwitch.")
    hass = switch.hass
    data = service_call.data
    all_lights = _expand_light_groups(hass, data[CONF_LIGHTS])
    switch.turn_on_off_listener.lights.update(all_lights)

    for light in all_lights:
        if data[CONF_TURN_ON_LIGHTS] or is_on(hass, light):
            await switch._adapt_light(  # pylint: disable=protected-access
                light,
                data[CONF_TRANSITION],
                data[CONF_ADAPT_BRIGHTNESS],
                data[CONF_ADAPT_COLOR_TEMP],
                data[CONF_ADAPT_RGB_COLOR],
                service_call.context,
            )


async def async_setup_entry(hass, config_entry: ConfigEntry, async_add_entities: bool):
    """Set up the AdaptiveLighting switch."""
    data = hass.data[DOMAIN]

    if ATTR_TURN_ON_OFF_LISTENER not in data:
        data[ATTR_TURN_ON_OFF_LISTENER] = TurnOnOffListener(hass)
    turn_on_off_listener = data[ATTR_TURN_ON_OFF_LISTENER]

    switch = AdaptiveSwitch(hass, config_entry, turn_on_off_listener)
    data[config_entry.entry_id][SWITCH_DOMAIN] = switch

    # Register `apply` service
    platform = entity_platform.current_platform.get()
    platform.async_register_entity_service(
        SERVICE_APPLY,
        {
            vol.Required(CONF_LIGHTS): cv.entity_ids,
            vol.Optional(
                CONF_TRANSITION,
                default=switch._initial_transition,  # pylint: disable=protected-access
            ): VALID_TRANSITION,
            vol.Optional(CONF_ADAPT_BRIGHTNESS, default=True): cv.boolean,
            vol.Optional(CONF_ADAPT_COLOR_TEMP, default=True): cv.boolean,
            vol.Optional(CONF_ADAPT_RGB_COLOR, default=True): cv.boolean,
            vol.Optional(CONF_TURN_ON_LIGHTS, default=False): cv.boolean,
        },
        handle_apply,
    )
    async_add_entities([switch], update_before_add=True)


def validate(config_entry):
    """Get the options and data from the config_entry and add defaults."""
    defaults = {key: default for key, default, _ in VALIDATION_TUPLES}
    data = deepcopy(defaults)
    data.update(config_entry.options)  # come from options flow
    data.update(config_entry.data)  # all yaml settings come from data
    data = {key: replace_none_str(value) for key, value in data.items()}
    for key, (validate_value, _) in EXTRA_VALIDATION.items():
        value = data.get(key)
        if value is not None:
            data[key] = validate_value(value)  # Fix the types of the inputs
    return data


def match_state_event(event: Event, from_or_to_state: List[str]):
    """Match state event when either 'from_state' or 'to_state' matches."""
    old_state = event.data.get("old_state")
    from_state_match = old_state is not None and old_state.state in from_or_to_state

    new_state = event.data.get("new_state")
    to_state_match = new_state is not None and new_state.state in from_or_to_state

    match = from_state_match or to_state_match
    return match


def _expand_light_groups(hass, lights: List[str]) -> List[str]:
    all_lights = set()
    for light in lights:
        state = hass.states.get(light)
        if state is None:
            _LOGGER.debug("State of %s is None", light)
            all_lights.add(light)
        elif "entity_id" in state.attributes:  # it's a light group
            group = state.attributes["entity_id"]
            all_lights.update(group)
            _LOGGER.debug("Expanded %s to %s", light, group)
        else:
            all_lights.add(light)
    return list(all_lights)


def _supported_features(hass, light: str):
    state = hass.states.get(light)
    supported_features = state.attributes["supported_features"]
    return {key for key, value in _SUPPORT_OPTS.items() if supported_features & value}


class AdaptiveSwitch(SwitchEntity, RestoreEntity):
    """Representation of a Adaptive Lighting switch."""

    def __init__(self, hass, config_entry, turn_on_off_listener: TurnOnOffListener):
        """Initialize the Adaptive Lighting switch."""
        self.hass = hass
        self.turn_on_off_listener = turn_on_off_listener

        data = validate(config_entry)
        self._name = data[CONF_NAME]
        self._lights = data[CONF_LIGHTS]
        self._adapt_brightness = data[CONF_ADAPT_BRIGHTNESS]
        self._adapt_color_temp = data[CONF_ADAPT_COLOR_TEMP]
        self._adapt_rgb_color = data[CONF_ADAPT_RGB_COLOR]
        self._disable_entity = data[CONF_DISABLE_ENTITY]
        self._disable_state = data[CONF_DISABLE_STATE]
        self._initial_transition = data[CONF_INITIAL_TRANSITION]
        self._interval = data[CONF_INTERVAL]
        self._only_once = data[CONF_ONLY_ONCE]
        self._prefer_rgb_color = data[CONF_PREFER_RGB_COLOR]
        self._sleep_entity = data[CONF_SLEEP_ENTITY]
        self._sleep_state = data[CONF_SLEEP_STATE]
        self._take_over_control = data[CONF_TAKE_OVER_CONTROL]
        self._transition = data[CONF_TRANSITION]

        self._sun_light_settings = SunLightSettings(
            name=self._name,
            astral_location=get_astral_location(self.hass),
            max_brightness=data[CONF_MAX_BRIGHTNESS],
            max_color_temp=data[CONF_MAX_COLOR_TEMP],
            min_brightness=data[CONF_MIN_BRIGHTNESS],
            min_color_temp=data[CONF_MIN_COLOR_TEMP],
            sleep_brightness=data[CONF_SLEEP_BRIGHTNESS],
            sleep_color_temp=data[CONF_SLEEP_COLOR_TEMP],
            sunrise_offset=data[CONF_SUNRISE_OFFSET],
            sunrise_time=data[CONF_SUNRISE_TIME],
            sunset_offset=data[CONF_SUNSET_OFFSET],
            sunset_time=data[CONF_SUNSET_TIME],
            time_zone=self.hass.config.time_zone,
        )

        # Set other attributes
        self._icon = ICON
        self._entity_id = f"switch.{DOMAIN}_{slugify(self._name)}"
        self._state = None

        # Tracks 'off' → 'on' state changes
        self._on_to_off_event: Dict[str, Event] = {}
        # Tracks 'on' → 'off' state changes
        self._off_to_on_event: Dict[str, Event] = {}
        # Locks that prevent light adjusting when waiting for a light to 'turn_off'
        self._locks: Dict[str, asyncio.Lock] = {}

        # Initialize attributes that will be set in self._update_attrs
        self._light_settings = {}

        # Set and unset tracker in async_turn_on and async_turn_off
        self.remove_listeners = []
        _LOGGER.debug(
            "%s: Setting up with '%s',"
            " config_entry.data: '%s',"
            " config_entry.options: '%s', converted to '%s'.",
            self._name,
            self._lights,
            config_entry.data,
            config_entry.options,
            data,
        )

    @property
    def entity_id(self):
        """Return the entity ID of the switch."""
        return self._entity_id

    @property
    def name(self):
        """Return the name of the device if any."""
        return self._name

    @property
    def is_on(self) -> Optional[bool]:
        """Return true if adaptive lighting is on."""
        return self._state

    async def async_added_to_hass(self):
        """Call when entity about to be added to hass."""
        if self.hass.is_running:
            await self._setup_listeners()
        else:
            self.hass.bus.async_listen_once(
                EVENT_HOMEASSISTANT_START, self._setup_listeners
            )
        last_state = await self.async_get_last_state()
        is_new_entry = last_state is None  # newly added to HA
        if is_new_entry or last_state.state == STATE_ON:
            await self.async_turn_on(adapt_lights=not self._only_once)
        else:
            self._state = False
            assert not self.remove_listeners

    def _expand_light_groups(self) -> None:
        all_lights = _expand_light_groups(self.hass, self._lights)
        self.turn_on_off_listener.lights.update(all_lights)
        self._lights = list(all_lights)

    async def _setup_listeners(self, _=None):
        _LOGGER.debug("%s: Called '_setup_listeners'", self._name)
        if not self.is_on or not self.hass.is_running:
            _LOGGER.debug("%s: Cancelled '_setup_listeners'", self._name)
            return
        assert not self.remove_listeners
        remove_interval = async_track_time_interval(
            self.hass, self._async_update_at_interval, self._interval
        )
        self.remove_listeners.append(remove_interval)
        if self._lights:
            self._expand_light_groups()
            remove_state = async_track_state_change_event(
                self.hass, self._lights, self._light_event
            )
            self.remove_listeners.append(remove_state)
        if self._sleep_entity is not None:
            remove_sleep = async_track_state_change_event(
                self.hass,
                self._sleep_entity,
                self._sleep_state_event,
            )
            self.remove_listeners.append(remove_sleep)
        if self._disable_entity is not None:
            remove_disable = async_track_state_change_event(
                self.hass,
                self._disable_entity,
                self._disable_state_event,
            )
            self.remove_listeners.append(remove_disable)

    def _remove_listeners(self):
        while self.remove_listeners:
            remove_listener = self.remove_listeners.pop()
            remove_listener()

    @property
    def icon(self):
        """Icon to use in the frontend, if any."""
        return self._icon

    @property
    def device_state_attributes(self):
        """Return the attributes of the switch."""
        if not self.is_on:
            return {key: None for key in self._light_settings}
        return self._light_settings

    async def async_turn_on(
        self, adapt_lights: bool = True
    ):  # pylint: disable=arguments-differ
        """Turn on adaptive lighting."""
        _LOGGER.debug(
            "%s: Called 'async_turn_on', current state is '%s'", self._name, self._state
        )
        if self.is_on:
            return
        self._state = True
        await self._setup_listeners()
        if adapt_lights:
            await self._update_attrs_and_maybe_adapt_lights(
                transition=self._initial_transition, force=True
            )

    async def async_turn_off(self, **kwargs):
        """Turn off adaptive lighting."""
        if not self.is_on:
            return
        self._state = False
        self._remove_listeners()

    @callback
    def _update_attrs(self):
        """Update Adaptive Values."""
        _LOGGER.debug("%s: '_update_attrs' called", self._name)
        self._light_settings = self._sun_light_settings.get_settings(self._is_sleep())
        self.async_write_ha_state()

    async def _async_update_at_interval(self, now=None):
        await self._update_attrs_and_maybe_adapt_lights(force=False)

    def _is_sleep(self):
        return (
            self._sleep_entity is not None
            and self.hass.states.get(self._sleep_entity).state in self._sleep_state
        )

    def _is_disabled(self):
        return (
            self._disable_entity is not None
            and self.hass.states.get(self._disable_entity).state in self._disable_state
        )

    async def _adapt_light(
        self,
        light: str,
        transition: Optional[int] = None,
        adapt_brightness: Optional[bool] = None,
        adapt_color_temp: Optional[bool] = None,
        adapt_rgb_color: Optional[bool] = None,
        context: Optional[Context] = None,
    ):
        lock = self._locks.get(light)
        if lock is not None and lock.locked():
            _LOGGER.debug("%s: '%s' is locked", self._name, light)
            return

        service_data = {ATTR_ENTITY_ID: light}
        features = _supported_features(self.hass, light)

        if transition is None:
            transition = self._transition
        if adapt_brightness is None:
            adapt_brightness = self._adapt_brightness
        if adapt_color_temp is None:
            adapt_color_temp = self._adapt_color_temp
        if adapt_rgb_color is None:
            adapt_rgb_color = self._adapt_rgb_color

        if "transition" in features:
            service_data[ATTR_TRANSITION] = transition

        if "brightness" in features and adapt_brightness:
            service_data[ATTR_BRIGHTNESS_PCT] = self._light_settings["brightness_pct"]

        if (
            "color_temp" in features
            and adapt_color_temp
            and not (self._prefer_rgb_color and "color" in features)
        ):
            attributes = self.hass.states.get(light).attributes
            min_mireds, max_mireds = attributes["min_mireds"], attributes["max_mireds"]
            color_temp_mired = self._light_settings["color_temp_mired"]
            color_temp_mired = max(min(color_temp_mired, max_mireds), min_mireds)
            service_data[ATTR_COLOR_TEMP] = color_temp_mired
        elif "color" in features and adapt_rgb_color:
            service_data[ATTR_RGB_COLOR] = self._light_settings["rgb_color"]

        _LOGGER.debug(
            "%s: Scheduling 'light.turn_on' with the following 'service_data': %s",
            self._name,
            service_data,
        )

        await self.hass.services.async_call(
            LIGHT_DOMAIN,
            SERVICE_TURN_ON,
            service_data,
            context=context,
        )

    async def _update_attrs_and_maybe_adapt_lights(
        self,
        lights: Optional[List[str]] = None,
        transition: Optional[int] = None,
        force: bool = False,
        context: Optional[Context] = None,
    ):
        assert self.is_on
        self._update_attrs()
        if lights is None:
            lights = self._lights
        if (self._only_once and not force) or self._is_disabled() or not lights:
            return
        await self._adapt_lights(lights, transition, context)

    async def _adapt_lights(
        self, lights: List[str], transition: Optional[int], context=Optional[Context]
    ):
        _LOGGER.debug(
            "%s: '_adapt_lights(%s, %s)' called", self.name, lights, transition
        )
        for light in lights:
            if not is_on(self.hass, light):
                continue
            if self._take_over_control:
                if await self.turn_on_off_listener.is_manually_adjusted(
                    light,
                    off_to_on_event=self._off_to_on_event.get(light),
                ):
                    continue
            await self._adapt_light(light, transition, context=context)

    async def _disable_state_event(self, event: Event):
        if not match_state_event(event, self._disable_state):
            return
        _LOGGER.debug("%s: _disable_state_event, event: '%s'", self._name, event)
        await self._update_attrs_and_maybe_adapt_lights(
            transition=self._initial_transition, force=True, context=event.context
        )

    async def _sleep_state_event(self, event: Event):
        if not match_state_event(event, self._sleep_state):
            return
        _LOGGER.debug("%s: _sleep_state_event, event: '%s'", self._name, event)
        await self._update_attrs_and_maybe_adapt_lights(
            transition=self._initial_transition, force=True, context=event.context
        )

    async def _light_event(self, event: Event):
        old_state = event.data.get("old_state")
        new_state = event.data.get("new_state")
        entity_id = event.data.get("entity_id")
        if (
            old_state is not None
            and old_state.state == "off"
            and new_state is not None
            and new_state.state == "on"
        ):
            _LOGGER.debug(
                "%s: Detected an 'off' → 'on' event for '%s'", self._name, entity_id
            )
            # Tracks 'off' → 'on' state changes
            self._off_to_on_event[entity_id] = event
            lock = self._locks.get(entity_id)
            if lock is None:
                lock = self._locks[entity_id] = asyncio.Lock()
            async with lock:
                if await self.turn_on_off_listener.maybe_cancel_adjusting(
                    entity_id,
                    off_to_on_event=event,
                    on_to_off_event=self._on_to_off_event.get(entity_id),
                ):
                    # Stop if a rapid 'off' → 'on' → 'off' happens.
                    _LOGGER.debug(
                        "%s: Cancelling adjusting lights for %s", self._name, entity_id
                    )
                    return

            await self._update_attrs_and_maybe_adapt_lights(
                lights=[entity_id],
                transition=self._initial_transition,
                force=True,
                context=event.context,
            )
        elif (
            old_state is not None
            and old_state.state == "on"
            and new_state is not None
            and new_state.state == "off"
        ):
            # Tracks 'off' → 'on' state changes
            self._on_to_off_event[entity_id] = event


@dataclass
class SunLightSettings:
    """Track the state of the sun and associated light settings."""

    name: str
    astral_location: astral.Location
    max_brightness: int
    max_color_temp: int
    min_brightness: int
    min_color_temp: int
    sleep_brightness: int
    sleep_color_temp: int
    sunrise_offset: Optional[datetime.timedelta]
    sunrise_time: Optional[datetime.time]
    sunset_offset: Optional[datetime.timedelta]
    sunset_time: Optional[datetime.time]
    time_zone: datetime.tzinfo

    def get_sun_events(self, date: datetime.datetime) -> Dict[str, float]:
        """Get the four sun event's timestamps at 'date'."""

        def _replace_time(date: datetime.datetime, key: str) -> datetime.datetime:
            time = getattr(self, f"{key}_time")
            date_time = datetime.datetime.combine(datetime.date.today(), time)
            utc_time = self.time_zone.localize(date_time).astimezone(dt_util.UTC)
            return date.replace(
                hour=utc_time.hour,
                minute=utc_time.minute,
                second=utc_time.second,
                microsecond=utc_time.microsecond,
            )

        location = self.astral_location
        sunrise = (
            location.sunrise(date, local=False)
            if self.sunrise_time is None
            else _replace_time(date, "sunrise")
        ) + self.sunrise_offset
        sunset = (
            location.sunset(date, local=False)
            if self.sunset_time is None
            else _replace_time(date, "sunset")
        ) + self.sunset_offset

        if self.sunrise_time is None and self.sunset_time is None:
            solar_noon = location.solar_noon(date, local=False)
            solar_midnight = location.solar_midnight(date, local=False)
        else:
            solar_noon = sunrise + (sunset - sunrise) / 2
            solar_midnight = sunset + ((sunrise + timedelta(days=1)) - sunset) / 2

        events = [
            (SUN_EVENT_SUNRISE, sunrise.timestamp()),
            (SUN_EVENT_SUNSET, sunset.timestamp()),
            (SUN_EVENT_NOON, solar_noon.timestamp()),
            (SUN_EVENT_MIDNIGHT, solar_midnight.timestamp()),
        ]
        # Check whether order is correct
        events = sorted(events, key=lambda x: x[1])
        events_names, _ = zip(*events)
        if events_names not in _ALLOWED_ORDERS:
            msg = (
                f"{self.name}: The sun events {events_names} are not in the expected"
                " order. The Adaptive Lighting integration will not work!"
                " This might happen if your sunrise/sunset offset is too large or"
                " your manually set sunrise/sunset time is past/before noon/midnight."
            )
            _LOGGER.error(msg)
            raise ValueError(msg)

        return events

    def relevant_events(self, now: datetime.datetime) -> Dict[str, float]:
        """Get the previous and next sun event."""
        events = [
            self.get_sun_events(now + timedelta(days=days)) for days in [-1, 0, 1]
        ]
        events = sum(events, [])  # flatten lists
        events = sorted(events, key=lambda x: x[1])
        i_now = bisect.bisect([ts for _, ts in events], now.timestamp())
        return events[i_now - 1 : i_now + 1]

    def calc_percent(self) -> float:
        """Calculate the position of the sun in %."""
        now = dt_util.utcnow()
        now_ts = now.timestamp()
        today = self.relevant_events(now)
        (_, prev_ts), (next_event, next_ts) = today
        h, x = (  # pylint: disable=invalid-name
            (prev_ts, next_ts)
            if next_event in (SUN_EVENT_SUNSET, SUN_EVENT_SUNRISE)
            else (next_ts, prev_ts)
        )
        k = 1 if next_event in (SUN_EVENT_SUNSET, SUN_EVENT_NOON) else -1
        percentage = (0 - k) * ((now_ts - h) / (h - x)) ** 2 + k
        return percentage

    def calc_brightness_pct(self, percent: float, is_sleep: bool) -> float:
        """Calculate the brightness in %."""
        if is_sleep:
            return self.sleep_brightness
        if percent > 0:
            return self.max_brightness
        delta_brightness = self.max_brightness - self.min_brightness
        percent = 1 + percent
        return (delta_brightness * percent) + self.min_brightness

    def calc_color_temp_kelvin(self, percent: float, is_sleep: bool) -> float:
        """Calculate the color temperature in Kelvin."""
        if is_sleep:
            return self.sleep_color_temp
        if percent > 0:
            delta = self.max_color_temp - self.min_color_temp
            return (delta * percent) + self.min_color_temp
        return self.min_color_temp

    def get_settings(
        self, is_sleep
    ) -> Dict[str, Union[float, Tuple[float, float], Tuple[float, float, float]]]:
        """Get all light settings.

        Calculating all values takes <0.5ms.
        """
        percent = self.calc_percent()
        brightness_pct = self.calc_brightness_pct(percent, is_sleep)
        color_temp_kelvin = self.calc_color_temp_kelvin(percent, is_sleep)
        color_temp_mired: float = color_temperature_kelvin_to_mired(color_temp_kelvin)
        rgb_color: Tuple[float, float, float] = color_temperature_to_rgb(
            color_temp_kelvin
        )
        xy_color: Tuple[float, float] = color_RGB_to_xy(*rgb_color)
        hs_color: Tuple[float, float] = color_xy_to_hs(*xy_color)
        return {
            "brightness_pct": brightness_pct,
            "color_temp_kelvin": color_temp_kelvin,
            "color_temp_mired": color_temp_mired,
            "rgb_color": rgb_color,
            "xy_color": xy_color,
            "hs_color": hs_color,
        }


class TurnOnOffListener:
    """Track 'light.turn_off' and 'light.turn_on' service calls."""

    def __init__(self, hass):
        """Initialize the TurnOnOffListener that is shared among all switches."""
        self.hass = hass
        self.lights = set()

        # Tracks 'light.turn_off' service calls
        self.turn_off_event: Dict[str, Event] = {}
        # Tracks 'light.turn_on' service calls
        self.turn_on_event: Dict[str, Event] = {}
        # Keeps 'asyncio.sleep` tasks that can be cancelled by 'light.turn_on' events
        self.sleep_tasks: Dict[str, asyncio.Task] = {}

        self.remove_listener = self.hass.bus.async_listen(
            EVENT_CALL_SERVICE, self.turn_on_off_event_listener
        )

    async def turn_on_off_event_listener(self, event: Event):
        """Track 'light.turn_off' and 'light.turn_on' service calls."""
        domain = event.data.get(ATTR_DOMAIN)
        if domain != LIGHT_DOMAIN:
            return

        service = event.data.get(ATTR_SERVICE)
        service_data = event.data.get(ATTR_SERVICE_DATA, {})

        entity_ids = service_data.get(ATTR_ENTITY_ID)
        if isinstance(entity_ids, str):
            entity_ids = [entity_ids]

        if not any(eid in self.lights for eid in entity_ids):
            return

        if service == SERVICE_TURN_OFF:
            transition = service_data.get(ATTR_TRANSITION)
            _LOGGER.debug(
                "Detected an 'light.turn_off('%s', transition=%s)' event",
                entity_ids,
                transition,
            )
            for eid in entity_ids:
                self.turn_off_event[eid] = event

        elif service == SERVICE_TURN_ON:
            _LOGGER.debug("Detected an 'light.turn_on('%s')' event", entity_ids)
            for eid in entity_ids:
                task = self.sleep_tasks.get(eid)
                if task is not None:
                    task.cancel()
                self.turn_on_event[eid] = event

    async def is_manually_adjusted(self, light: str, off_to_on_event: Optional[Event]):
        """Check if the light has been 'on' and is now manually being adjusted."""
        if off_to_on_event is None:
            # No state change has been registered before, so we can't tell.
            return False
        return False

    async def maybe_cancel_adjusting(
        self, entity_id: str, off_to_on_event: Event, on_to_off_event: Optional[Event]
    ) -> bool:
        """Cancel the adjusting of a light if it has just been turned off.

        Possibly the lights just got a 'turn_off' call, however, the light
        is actually still turning off (e.g., because of a 'transition') and
        HA polls the light before the light is 100% off. This might trigger
        a rapid switch 'off' → 'on' → 'off'. To prevent this component
        from interfering on the 'on' state, we make sure to wait at least
        TURNING_OFF_DELAY (or the 'turn_off' transition time) between a
        'off' → 'on' event and then check whether the light is still 'on' or
        if the brightness is still decreasing. Only if it is the case we
        adjust the lights.
        """
        if on_to_off_event is None:
            # No state change has been registered before.
            return False

        id_on_to_off = on_to_off_event.context.id

        turn_off_event = self.turn_off_event.get(entity_id)
        id_turn_off = turn_off_event.context.id
        transition = turn_off_event.data[ATTR_SERVICE_DATA].get(ATTR_TRANSITION)

        turn_on_event = self.turn_on_event.get(entity_id)
        id_turn_on = turn_on_event.context.id

        id_off_to_on = off_to_on_event.context.id

        if id_off_to_on == id_turn_on and id_off_to_on is not None:
            # State change 'off' → 'on' triggered by 'light.turn_on'.
            return False

        if (
            id_on_to_off == id_turn_off
            and id_on_to_off is not None
            and transition is not None  # 'turn_off' is called with transition=...
        ):
            # State change 'on' → 'off' and 'light.turn_off(..., transition=...)' come
            # from the same event, so wait at least the 'turn_off' transition time.
            delay = max(transition, TURNING_OFF_DELAY)
        else:
            # State change 'off' → 'on' happened because the light state was set.
            # Possibly because of polling.
            delay = TURNING_OFF_DELAY

        delta_time = (dt_util.utcnow() - on_to_off_event.time_fired).total_seconds()
        if delta_time > delay:
            return False

        # Here we could just `return True` but because we want to prevent any updates
        # from happening to this light (through async_track_time_interval or
        # sleep_state or disable_state) for some time, we wait below until the light
        # is 'off' or the time has passed.

        delay -= delta_time  # delta_time has passed since the 'off' → 'on' event
        _LOGGER.debug("Waiting with adjusting '%s' for %s", entity_id, delay)

        for _ in range(3):
            # It can happen that the actual transition time is longer than the
            # specified time in the 'turn_off' service.
            coro = asyncio.sleep(delay)
            task = self.sleep_tasks[entity_id] = asyncio.ensure_future(coro)
            try:
                await task
            except asyncio.CancelledError:  # 'light.turn_on' has been called
                _LOGGER.debug(
                    "Sleep task is cancelled due to 'light.turn_on('%s')' call",
                    entity_id,
                )
                return False

            if not is_on(self.hass, entity_id):
                return True
            delay = TURNING_OFF_DELAY  # next time only wait this long

        if transition is not None:
            # Always ignore when there's a 'turn_off' transition.
            # Because it seems like HA cannot detect whether a light is
            # transitioning into 'off'. Maybe needs some discussion/input?
            return True

        # Now we assume that the lights are still on and they were intended
        # to be on. In case this still gives problems for some, we might
        # choose to **only** adapt on 'light.turn_on' events and ignore
        # other 'off' → 'on' state switches resulting from polling. That
        # would mean we 'return True' here.
        return False
