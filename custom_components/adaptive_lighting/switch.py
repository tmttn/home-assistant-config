"""
Adaptive Lighting Component for Home-Assistant.

This component calculates color temperature and brightness to synchronize
your color changing lights with perceived color temperature of the sky throughout
the day. This gives your environment a more natural feel, with cooler whites during
the midday and warmer tints near twilight and dawn.

In addition, the component sets your lights to a nice warm white at 1% in "Sleep" mode,
which is far brighter than starlight but won't reset your adaptive rhythm or break down
too much rhodopsin in your eyes.

Human circadian rhythms are heavily influenced by ambient light levels and
hues. Hormone production, brainwave activity, mood and wakefulness are
just some of the cognitive functions tied to cyclical natural light.
http://en.wikipedia.org/wiki/Zeitgeber

Here's some further reading:

http://www.cambridgeincolour.com/tutorials/sunrise-sunset-calculator.htm
http://en.wikipedia.org/wiki/Color_temperature

Technical notes: I had to make a lot of assumptions when writing this app
*   There are no considerations for weather or altitude, but does use your
    hub's location to calculate the sun position.
*   The component doesn't calculate a true "Blue Hour" -- it just sets the
    lights to 2700K (warm white) until your hub goes into Night mode
"""

import asyncio
import logging
from datetime import timedelta

import voluptuous as vol

import homeassistant.helpers.config_validation as cv
import homeassistant.util.dt as dt_util
from homeassistant.components.light import (
    ATTR_BRIGHTNESS_PCT,
    ATTR_COLOR_TEMP,
    ATTR_RGB_COLOR,
    ATTR_TRANSITION,
)
from homeassistant.components.light import DOMAIN as LIGHT_DOMAIN
from homeassistant.components.light import (
    SUPPORT_BRIGHTNESS,
    SUPPORT_COLOR,
    SUPPORT_COLOR_TEMP,
    SUPPORT_TRANSITION,
    is_on,
)
from homeassistant.components.switch import SwitchEntity
from homeassistant.const import (
    ATTR_ENTITY_ID,
    CONF_NAME,
    CONF_PLATFORM,
    SERVICE_TURN_ON,
    STATE_ON,
    SUN_EVENT_SUNRISE,
    SUN_EVENT_SUNSET,
)
from homeassistant.helpers.event import (
    async_track_state_change,
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

from .const import (
    _COMMON_SCHEMA,
    CONF_DISABLE_BRIGHTNESS_ADJUST,
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
    CONF_SLEEP_BRIGHTNESS,
    CONF_SLEEP_COLOR_TEMP,
    CONF_SLEEP_ENTITY,
    CONF_SLEEP_STATE,
    CONF_SUNRISE_OFFSET,
    CONF_SUNRISE_TIME,
    CONF_SUNSET_OFFSET,
    CONF_SUNSET_TIME,
    CONF_TRANSITION,
    DOMAIN,
    ICON,
    SUN_EVENT_MIDNIGHT,
    SUN_EVENT_NOON,
)

_SUPPORT_OPTS = {
    "brightness": SUPPORT_BRIGHTNESS,
    "color_temp": SUPPORT_COLOR_TEMP,
    "color": SUPPORT_COLOR,
    "transition": SUPPORT_TRANSITION,
}


_LOGGER = logging.getLogger(__name__)

SCAN_INTERVAL = timedelta(seconds=10)

PLATFORM_SCHEMA = vol.Schema(
    {
        vol.Required(CONF_PLATFORM): DOMAIN,
        vol.Optional(CONF_NAME, default="Adaptive Lighting"): cv.string,
        **_COMMON_SCHEMA,
    }
)


def setup_platform(hass, config, add_devices, discovery_info=None):
    """Set up the Adaptive Lighting switches."""
    switch = AdaptiveSwitch(
        hass,
        name=config[CONF_NAME],
        lights=config[CONF_LIGHTS],
        disable_brightness_adjust=config[CONF_DISABLE_BRIGHTNESS_ADJUST],
        disable_entity=config.get(CONF_DISABLE_ENTITY),
        disable_state=config.get(CONF_DISABLE_STATE),
        initial_transition=config[CONF_INITIAL_TRANSITION],
        interval=config[CONF_INTERVAL],
        max_brightness=config[CONF_MAX_BRIGHTNESS],
        max_color_temp=config[CONF_MAX_COLOR_TEMP],
        min_brightness=config[CONF_MIN_BRIGHTNESS],
        min_color_temp=config[CONF_MIN_COLOR_TEMP],
        only_once=config[CONF_ONLY_ONCE],
        sleep_brightness=config[CONF_SLEEP_BRIGHTNESS],
        sleep_color_temp=config[CONF_SLEEP_COLOR_TEMP],
        sleep_entity=config.get(CONF_SLEEP_ENTITY),
        sleep_state=config.get(CONF_SLEEP_STATE),
        sunrise_offset=config[CONF_SUNRISE_OFFSET],
        sunrise_time=config.get(CONF_SUNRISE_TIME),
        sunset_offset=config[CONF_SUNSET_OFFSET],
        sunset_time=config.get(CONF_SUNSET_TIME),
        transition=config[CONF_TRANSITION],
    )
    add_devices([switch])


def _difference_between_states(from_state, to_state):
    start = "Lights adjusting because "
    if from_state is None and to_state is None:
        return start + "both states None"
    if from_state is None:
        return start + f"from_state: None, to_state: {to_state}"
    if to_state is None:
        return start + f"from_state: {from_state}, to_state: None"

    changed_attrs = ", ".join(
        [
            f"{key}: {val}"
            for key, val in to_state.attributes.items()
            if from_state.attributes.get(key) != val
        ]
    )
    if from_state.state == to_state.state:
        return start + (
            f"{from_state.entity_id} is still {to_state.state} but"
            f" these attributes changes: {changed_attrs}."
        )
    elif changed_attrs != "":
        return start + (
            f"{from_state.entity_id} changed from {from_state.state} to"
            f" {to_state.state} and these attributes changes: {changed_attrs}."
        )
    else:
        return start + (
            f"{from_state.entity_id} changed from {from_state.state} to"
            f" {to_state.state} and no attributes changed."
        )


class AdaptiveSwitch(SwitchEntity, RestoreEntity):
    """Representation of a Adaptive Lighting switch."""

    def __init__(
        self,
        hass,
        name,
        lights,
        disable_brightness_adjust,
        disable_entity,
        disable_state,
        initial_transition,
        interval,
        max_brightness,
        max_color_temp,
        min_brightness,
        min_color_temp,
        only_once,
        sleep_brightness,
        sleep_color_temp,
        sleep_entity,
        sleep_state,
        sunrise_offset,
        sunrise_time,
        sunset_offset,
        sunset_time,
        transition,
    ):
        """Initialize the Adaptive Lighting switch."""
        self.hass = hass
        self._name = name
        self._entity_id = f"switch.adaptive_lighting_{slugify(name)}"
        self._icon = ICON

        # Set attributes from arguments
        self._lights = lights
        self._disable_brightness_adjust = disable_brightness_adjust
        self._disable_entity = disable_entity
        self._disable_state = disable_state
        self._initial_transition = initial_transition
        self._interval = interval
        self._max_brightness = max_brightness
        self._max_color_temp = max_color_temp
        self._min_brightness = min_brightness
        self._min_color_temp = min_color_temp
        self._only_once = only_once
        self._sleep_brightness = sleep_brightness
        self._sleep_color_temp = sleep_color_temp
        self._sleep_entity = sleep_entity
        self._sleep_state = sleep_state
        self._sunrise_offset = sunrise_offset
        self._sunrise_time = sunrise_time
        self._sunset_offset = sunset_offset
        self._sunset_time = sunset_time
        self._transition = transition

        # Initialize attributes that will be set in self._update_attrs
        self._percent = None
        self._brightness = None
        self._color_temp_kelvin = None
        self._color_temp_mired = None
        self._rgb_color = None
        self._xy_color = None
        self._hs_color = None

        # Set and unset tracker in async_turn_on and async_turn_off
        self.unsub_tracker = None

    @property
    def entity_id(self):
        """Return the entity ID of the switch."""
        return self._entity_id

    @property
    def name(self):
        """Return the name of the device if any."""
        return self._name

    @property
    def is_on(self):
        """Return true if adaptive lighting is on."""
        return self.unsub_tracker is not None

    def _supported_features(self, light):
        state = self.hass.states.get(light)
        supported_features = state.attributes["supported_features"]
        return {
            key for key, value in _SUPPORT_OPTS.items() if supported_features & value
        }

    def _unpack_light_groups(self, lights):
        all_lights = []
        for light in lights:
            state = self.hass.states.get(light)
            if state is None:
                _LOGGER.debug("State of %s is None", light)
                # TODO: make sure that the lights are loaded when doing this
                all_lights.append(light)
            elif "entity_id" in state.attributes:  # it's a light group
                group = state.attributes["entity_id"]
                self.debug("Unpacked %s to %s", group)
                all_lights.extend(group)
            else:
                all_lights.append(light)
        return all_lights

    async def async_added_to_hass(self):
        """Call when entity about to be added to hass."""
        if self._lights:
            async_track_state_change(
                self.hass,
                self._unpack_light_groups(self._lights),
                self._light_state_changed,
                to_state="on",
                from_state="off",
            )
            track_kwargs = dict(hass=self.hass, action=self._state_changed)
            if self._sleep_entity is not None:
                sleep_kwargs = dict(track_kwargs, entity_ids=self._sleep_entity)
                async_track_state_change(**sleep_kwargs, to_state=self._sleep_state)
                async_track_state_change(**sleep_kwargs, from_state=self._sleep_state)

            if self._disable_entity is not None:
                disable_kwargs = dict(track_kwargs, entity_ids=self._disable_entity)
                async_track_state_change(
                    **disable_kwargs, from_state=self._disable_state
                )
                async_track_state_change(**disable_kwargs, to_state=self._disable_state)

        last_state = await self.async_get_last_state()
        if last_state and last_state.state == STATE_ON:
            await self.async_turn_on()

    @property
    def icon(self):
        """Icon to use in the frontend, if any."""
        return self._icon

    @property
    def device_state_attributes(self):
        """Return the attributes of the switch."""
        attrs = {
            "percent": self._percent,
            "brightness": self._brightness,
            "color_temp_kelvin": self._color_temp_kelvin,
            "color_temp_mired": self._color_temp_mired,
            "rgb_color": self._rgb_color,
            "xy_color": self._xy_color,
            "hs_color": self._hs_color,
        }
        if not self.is_on:
            return {key: None for key in attrs.keys()}
        return attrs

    async def async_turn_on(self, **kwargs):
        """Turn on adaptive lighting."""
        await self._update_lights(transition=self._initial_transition, force=True)
        self.unsub_tracker = async_track_time_interval(
            self.hass, self._async_update_at_interval, self._interval
        )

    async def async_turn_off(self, **kwargs):
        """Turn off adaptive lighting."""
        if self.is_on:
            self.unsub_tracker()
            self.unsub_tracker = None

    async def _update_attrs(self):
        """Update Adaptive Values."""
        # Setting all values because this method takes <0.5ms to execute.
        self._percent = self._calc_percent()
        self._brightness = self._calc_brightness()
        self._color_temp_kelvin = self._calc_color_temp_kelvin()
        self._color_temp_mired = color_temperature_kelvin_to_mired(
            self._color_temp_kelvin
        )
        self._rgb_color = color_temperature_to_rgb(self._color_temp_kelvin)
        self._xy_color = color_RGB_to_xy(*self._rgb_color)
        self._hs_color = color_xy_to_hs(*self._xy_color)
        self.async_write_ha_state()
        _LOGGER.debug("'_update_attrs' called for %s", self._name)

    async def _async_update_at_interval(self, now=None):
        await self._update_lights(force=False)

    async def _update_lights(self, lights=None, transition=None, force=False):
        await self._update_attrs()
        if self._only_once and not force:
            return
        await self._adjust_lights(lights or self._lights, transition)

    def _get_sun_events(self, date):
        def _replace_time(date, key):
            other_date = getattr(self, f"_{key}_time")
            return date.replace(
                hour=other_date.hour,
                minute=other_date.minute,
                second=other_date.second,
                microsecond=other_date.microsecond,
            )

        location = get_astral_location(self.hass)
        sunrise = (
            location.sunrise(date, local=False)
            if self._sunrise_time is None
            else _replace_time(date, "sunrise")
        ) + self._sunrise_offset
        sunset = (
            location.sunset(date, local=False)
            if self._sunset_time is None
            else _replace_time(date, "sunset")
        ) + self._sunset_offset

        if self._sunrise_time is None and self._sunset_time is None:
            solar_noon = location.solar_noon(date, local=False)
            solar_midnight = location.solar_midnight(date, local=False)
        else:
            solar_noon = sunrise + (sunset - sunrise) / 2
            solar_midnight = sunset + ((sunrise + timedelta(days=1)) - sunset) / 2

        return {
            SUN_EVENT_SUNRISE: sunrise.timestamp(),
            SUN_EVENT_SUNSET: sunset.timestamp(),
            SUN_EVENT_NOON: solar_noon.timestamp(),
            SUN_EVENT_MIDNIGHT: solar_midnight.timestamp(),
        }

    def _calc_percent(self):
        now = dt_util.utcnow()
        now_ts = now.timestamp()

        today = self._get_sun_events(now)
        if now_ts < today[SUN_EVENT_SUNRISE]:
            # It's before sunrise (after midnight), because it's before
            # sunrise (and after midnight) sunset must have happend yesterday.
            yesterday = self._get_sun_events(now - timedelta(days=1))
            if (
                today[SUN_EVENT_MIDNIGHT] > today[SUN_EVENT_SUNSET]
                and yesterday[SUN_EVENT_MIDNIGHT] > yesterday[SUN_EVENT_SUNSET]
            ):
                # Solar midnight is after sunset so use yesterdays's time
                today[SUN_EVENT_MIDNIGHT] = yesterday[SUN_EVENT_MIDNIGHT]
            today[SUN_EVENT_SUNSET] = yesterday[SUN_EVENT_SUNSET]
        elif now_ts > today[SUN_EVENT_SUNSET]:
            # It's after sunset (before midnight), because it's after sunset
            # (and before midnight) sunrise should happen tomorrow.
            tomorrow = self._get_sun_events(now + timedelta(days=1))
            if (
                today[SUN_EVENT_MIDNIGHT] < today[SUN_EVENT_SUNRISE]
                and tomorrow[SUN_EVENT_MIDNIGHT] < tomorrow[SUN_EVENT_SUNRISE]
            ):
                # Solar midnight is before sunrise so use tomorrow's time
                today[SUN_EVENT_MIDNIGHT] = tomorrow[SUN_EVENT_MIDNIGHT]
            today[SUN_EVENT_SUNRISE] = tomorrow[SUN_EVENT_SUNRISE]

        # Figure out where we are in time so we know which half of the
        # parabola to calculate. We're generating a different
        # sunset-sunrise parabola for before and after solar midnight.
        # because it might not be half way between sunrise and sunset.
        # We're also generating a different parabola for sunrise-sunset.

        # sunrise -> sunset parabola
        if today[SUN_EVENT_SUNRISE] < now_ts < today[SUN_EVENT_SUNSET]:
            h = today[SUN_EVENT_NOON]
            k = 1
            # parabola before solar_noon else after solar_noon
            x = (
                today[SUN_EVENT_SUNRISE]
                if now_ts < today[SUN_EVENT_NOON]
                else today[SUN_EVENT_SUNSET]
            )

        # sunset -> sunrise parabola
        elif today[SUN_EVENT_SUNSET] < now_ts < today[SUN_EVENT_SUNRISE]:
            h = today[SUN_EVENT_MIDNIGHT]
            k = -1
            # parabola before solar_midnight else after solar_midnight
            x = (
                today[SUN_EVENT_SUNSET]
                if now_ts < today[SUN_EVENT_MIDNIGHT]
                else today[SUN_EVENT_SUNRISE]
            )

        y = 0
        a = (y - k) / (h - x) ** 2
        percentage = a * (now_ts - h) ** 2 + k
        return percentage

    def _is_sleep(self):
        return (
            self._sleep_entity is not None
            and self.hass.states.get(self._sleep_entity).state in self._sleep_state
        )

    def _calc_color_temp_kelvin(self):
        if self._is_sleep():
            return self._sleep_color_temp
        if self._percent > 0:
            delta = self._max_color_temp - self._min_color_temp
            return (delta * self._percent) + self._min_color_temp
        return self._min_color_temp

    def _calc_brightness(self) -> float:
        if self._disable_brightness_adjust:
            return
        if self._is_sleep():
            return self._sleep_brightness
        if self._percent > 0:
            return self._max_brightness
        delta_brightness = self._max_brightness - self._min_brightness
        percent = 1 + self._percent
        return (delta_brightness * percent) + self._min_brightness

    def _is_disabled(self):
        return (
            self._disable_entity is not None
            and self.hass.states.get(self._disable_entity).state in self._disable_state
        )

    async def _adjust_light(self, light, transition):
        service_data = {ATTR_ENTITY_ID: light}
        features = self._supported_features(light)

        if "transition" in features:
            if transition is None:
                transition = self._transition
            service_data[ATTR_TRANSITION] = transition

        if self._brightness is not None and "brightness" in features:
            service_data[ATTR_BRIGHTNESS_PCT] = self._brightness

        if "color" in features:
            service_data[ATTR_RGB_COLOR] = self._rgb_color
        elif "color_temp" in features:
            service_data[ATTR_COLOR_TEMP] = self._color_temp_mired

        _LOGGER.debug(
            "Scheduling 'light.turn_on' with the following 'service_data': %s",
            service_data,
        )
        return self.hass.services.async_call(
            LIGHT_DOMAIN, SERVICE_TURN_ON, service_data
        )

    def _should_adjust(self):
        if not self._lights or not self.is_on or self._is_disabled():
            return False
        return True

    async def _adjust_lights(self, lights, transition):
        if not self._should_adjust():
            return
        tasks = [
            await self._adjust_light(light, transition)
            for light in lights
            if is_on(self.hass, light)
        ]
        if tasks:
            await asyncio.wait(tasks)

    async def _light_state_changed(self, entity_id, from_state, to_state):
        assert to_state.state == "on" and from_state.state == "off"
        _LOGGER.debug(_difference_between_states(from_state, to_state))
        await self._update_lights(
            lights=[entity_id], transition=self._initial_transition, force=True
        )

    async def _state_changed(self, entity_id, from_state, to_state):
        _LOGGER.debug(_difference_between_states(from_state, to_state))
        await self._update_lights(transition=self._initial_transition, force=True)
