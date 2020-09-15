"""Config flow for Coronavirus integration."""
import logging

import homeassistant.helpers.config_validation as cv
import voluptuous as vol
from homeassistant import config_entries
from homeassistant.components.light import VALID_TRANSITION
from homeassistant.core import callback

from .const import (
    CONF_DISABLE_BRIGHTNESS_ADJUST,
    CONF_DISABLE_ENTITY,
    CONF_DISABLE_STATE,
    CONF_INITIAL_TRANSITION,
    CONF_INTERVAL,
    CONF_LIGHTS_BRIGHTNESS,
    CONF_LIGHTS_MIRED,
    CONF_LIGHTS_RGB,
    CONF_LIGHTS_XY,
    CONF_MAX_BRIGHTNESS,
    CONF_MAX_CT,
    CONF_MIN_BRIGHTNESS,
    CONF_MIN_CT,
    CONF_ONLY_ONCE,
    CONF_SLEEP_BRIGHTNESS,
    CONF_SLEEP_CT,
    CONF_SLEEP_ENTITY,
    CONF_SLEEP_STATE,
    CONF_SUNRISE_OFFSET,
    CONF_SUNRISE_TIME,
    CONF_SUNSET_OFFSET,
    CONF_SUNSET_TIME,
    CONF_TRANSITION,
    DEFAULT_INITIAL_TRANSITION,
    DEFAULT_INTERVAL,
    DEFAULT_MAX_BRIGHTNESS,
    DEFAULT_MAX_CT,
    DEFAULT_MIN_BRIGHTNESS,
    DEFAULT_MIN_CT,
    DEFAULT_SLEEP_BRIGHTNESS,
    DEFAULT_SLEEP_CT,
    DEFAULT_TRANSITION,
    DOMAIN,
)

_LOGGER = logging.getLogger(__name__)


class ConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Adaptive Lighting."""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Handle the initial step."""
        errors = {}

        if user_input is not None:
            await self.async_set_unique_id(user_input["name"])
            self._abort_if_unique_id_configured()
            return self.async_create_entry(title=user_input["name"], data=user_input)

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema({vol.Required("name"): str}),
            errors=errors,
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        """Get the options flow for this handler."""
        return OptionsFlowHandler(config_entry)


class OptionsFlowHandler(config_entries.OptionsFlow):
    """Handle a option flow for Adaptive Lighting."""

    def __init__(self, config_entry: config_entries.ConfigEntry):
        """Initialize options flow."""
        self.config_entry = config_entry

    async def async_step_init(self, user_input=None):
        """Handle options flow."""
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        options = self.config_entry.options

        lights_brightness = options.get(CONF_LIGHTS_BRIGHTNESS, [])
        lights_mired = options.get(CONF_LIGHTS_MIRED, [])
        lights_rgb = options.get(CONF_LIGHTS_RGB, [])
        lights_xy = options.get(CONF_LIGHTS_XY, [])
        disable_brightness_adjust = options.get(CONF_DISABLE_BRIGHTNESS_ADJUST, False)
        disable_entity = options.get(CONF_DISABLE_ENTITY)
        disable_state = options.get(CONF_DISABLE_STATE)
        initial_transition = options.get(
            CONF_INITIAL_TRANSITION, DEFAULT_INITIAL_TRANSITION
        )
        interval = options.get(CONF_INTERVAL, DEFAULT_INTERVAL)
        max_brightness = options.get(CONF_MAX_BRIGHTNESS, DEFAULT_MAX_BRIGHTNESS)
        max_colortemp = options.get(CONF_MAX_CT, DEFAULT_MAX_CT)
        min_brightness = options.get(CONF_MIN_BRIGHTNESS, DEFAULT_MIN_BRIGHTNESS)
        min_colortemp = options.get(CONF_MIN_CT, DEFAULT_MIN_CT)
        only_once = options.get(CONF_ONLY_ONCE, False)
        sleep_brightness = options.get(CONF_SLEEP_BRIGHTNESS, DEFAULT_SLEEP_BRIGHTNESS)
        sleep_colortemp = options.get(CONF_SLEEP_CT, DEFAULT_SLEEP_CT)
        sleep_entity = options.get(CONF_SLEEP_ENTITY)
        sleep_state = options.get(CONF_SLEEP_STATE)
        sunrise_offset = options.get(CONF_SUNRISE_OFFSET, 0)
        sunrise_time = options.get(CONF_SUNRISE_TIME)
        sunset_offset = options.get(CONF_SUNSET_OFFSET, 0)
        sunset_time = options.get(CONF_SUNSET_TIME)
        transition = options.get(CONF_TRANSITION, DEFAULT_TRANSITION)

        all_lights = self.hass.states.async_entity_ids("light")
        all_lights = cv.multi_select(all_lights)

        options_schema = vol.Schema(
            {
                vol.Optional(
                    CONF_LIGHTS_BRIGHTNESS, default=lights_brightness
                ): all_lights,
                vol.Optional(CONF_LIGHTS_MIRED, default=lights_mired): all_lights,
                vol.Optional(CONF_LIGHTS_RGB, default=lights_rgb): all_lights,
                vol.Optional(CONF_LIGHTS_XY, default=lights_xy): all_lights,
                vol.Optional(
                    CONF_DISABLE_BRIGHTNESS_ADJUST, default=disable_brightness_adjust
                ): bool,
                vol.Optional(CONF_DISABLE_ENTITY, default=disable_entity): str,
                vol.Optional(CONF_DISABLE_STATE, default=disable_state): str,
                vol.Optional(
                    CONF_INITIAL_TRANSITION, default=initial_transition
                ): cv.positive_int,
                vol.Optional(CONF_INTERVAL, default=interval): cv.positive_int,
                vol.Optional(CONF_MAX_BRIGHTNESS, default=max_brightness): vol.All(
                    vol.Coerce(int), vol.Range(min=1, max=100)
                ),
                vol.Optional(CONF_MAX_CT, default=max_colortemp): vol.All(
                    vol.Coerce(int), vol.Range(min=1000, max=10000)
                ),
                vol.Optional(CONF_MIN_BRIGHTNESS, default=min_brightness): vol.All(
                    vol.Coerce(int), vol.Range(min=1, max=100)
                ),
                vol.Optional(CONF_MIN_CT, default=min_colortemp): vol.All(
                    vol.Coerce(int), vol.Range(min=1000, max=10000)
                ),
                vol.Optional(CONF_ONLY_ONCE, default=only_once): bool,
                vol.Optional(CONF_SLEEP_BRIGHTNESS, default=sleep_brightness): vol.All(
                    vol.Coerce(int), vol.Range(min=1, max=100)
                ),
                vol.Optional(CONF_SLEEP_CT, default=sleep_colortemp): vol.All(
                    vol.Coerce(int), vol.Range(min=1000, max=10000)
                ),
                vol.Optional(CONF_SLEEP_ENTITY, default=sleep_entity): str,
                vol.Optional(CONF_SLEEP_STATE, default=sleep_state): str,
                vol.Optional(CONF_SUNRISE_OFFSET, default=sunrise_offset): int,
                vol.Optional(CONF_SUNRISE_TIME, default=sunrise_time): str,
                vol.Optional(CONF_SUNSET_OFFSET, default=sunset_offset): int,
                vol.Optional(CONF_SUNSET_TIME, default=sunset_time): str,
                vol.Optional(CONF_TRANSITION, default=transition): VALID_TRANSITION,
            }
        )

        return self.async_show_form(step_id="init", data_schema=options_schema)
