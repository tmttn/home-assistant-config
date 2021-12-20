"""The bpost integration."""
from __future__ import annotations

import logging

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry

from .bpost_entry_data import BpostEntryData
from .const import DOMAIN

PLATFORMS: list[str] = ["sensor", "binary_sensor", "camera"]
_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: dict):
    """Set up the bpost component."""
    hass.data.setdefault(DOMAIN, {})
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up bpost from a config entry."""
    entry_data = BpostEntryData(data=entry.data, hass=hass, logger=_LOGGER)
    hass.data[DOMAIN][entry.entry_id] = entry_data

    def update_callback() -> None:
        registry = entity_registry.async_get(hass)
        entities = entity_registry.async_entries_for_config_entry(registry, entry.entry_id)
        entity_ids = [entity.unique_id for entity in entities]
        current: list[str] = []

        for platform_key, platform_data in entry_data.coordinator.data.items():
            for sensor_id, _sensor_data in platform_data.items():
                current.append(f"{DOMAIN}_{platform_key}_{sensor_id}")

        to_remove = [entity_id for entity_id in entity_ids if entity_id not in current]

        for unique_id in to_remove:
            entity_id = [entity.entity_id for entity in entities if entity.unique_id == unique_id][0]
            registry.async_remove(entity_id)

    entry_data.coordinator.async_add_listener(update_callback)

    await entry_data.coordinator.async_config_entry_first_refresh()
    hass.config_entries.async_setup_platforms(entry, PLATFORMS)

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id)

    return unload_ok
