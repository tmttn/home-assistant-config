"""Notifies when a device keeps dropping to `unavailable` (flapping).

A device that briefly goes unavailable over and over (weak wifi, failing
power supply) breaks the automations that use it without ever being down
long enough to notice. This counts each entity's drops to unavailable in a
sliding window and sends one push when an entity reaches the threshold.

All entities of one device usually drop together, so alerts are collected
for BATCH_DELAY_S seconds and sent as one message.

Counts live in memory: a restart or pyscript reload starts them from zero,
which only delays an alert. Drops during the first STARTUP_GRACE_S seconds
are ignored, because entities start out unavailable while integrations load.
"""
import sys
import time

sys.path.append("/config/pyscript")

from python_modules.flap_detector import FlapDetector

NOTIFY_NAME = "mobile_app_bizzyphone"
THRESHOLD = 5  # drops to unavailable ...
WINDOW_S = 3600  # ... within this many seconds
COOLDOWN_S = 12 * 3600  # at most one alert per entity per 12 hours
BATCH_DELAY_S = 120
STARTUP_GRACE_S = 300
IGNORED_DOMAINS = {
    "automation",
    "device_tracker",
    "person",
    "scene",
    "script",
    "sun",
    "update",
    "zone",
}
# Entities that drop to unavailable whenever a cloud API call fails, while the
# device itself stays connected. Alerting on them says nothing about the
# device's wifi or power.
IGNORED_ENTITIES = {
    # Miele polls filling levels from its cloud every 60 s; each timeout marks
    # them unavailable. The washer's other entities use a push stream.
    "sensor.washing_machine_twindos_1_level",
    "sensor.washing_machine_twindos_2_level",
}

detector = FlapDetector(THRESHOLD, WINDOW_S, COOLDOWN_S)
loaded_at = time.monotonic()
pending = {}
flush_scheduled = False


@event_trigger(
    "state_changed",
    "new_state is not None and new_state.state == 'unavailable'"
    " and old_state is not None and old_state.state != 'unavailable'",
)
def flap_monitor_record(entity_id=None, new_state=None, **kwargs):
    global flush_scheduled
    now = time.monotonic()
    if now - loaded_at < STARTUP_GRACE_S:
        return
    if entity_id.split(".", 1)[0] in IGNORED_DOMAINS:
        return
    if entity_id in IGNORED_ENTITIES:
        return
    if not detector.record(entity_id, now):
        return
    name = new_state.attributes.get("friendly_name", entity_id)
    pending[entity_id] = (name, detector.count(entity_id, now))
    if flush_scheduled:
        return
    flush_scheduled = True
    task.sleep(BATCH_DELAY_S)
    flush_scheduled = False
    flap_monitor_flush()


def flap_monitor_flush():
    if not pending:
        return
    items = sorted(pending.items())
    pending.clear()
    window_min = WINDOW_S // 60
    lines = [f"- {name} ({count}× in {window_min} min)" for _, (name, count) in items]
    service.call(
        "notify",
        NOTIFY_NAME,
        title="Toestel valt steeds weg 📡",
        message="Deze worden steeds onbeschikbaar:\n" + "\n".join(lines)
        + "\nCheck het wifi-/Zigbee-signaal of de voeding.",
    )
