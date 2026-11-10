"""Detects entities that keep dropping to `unavailable` (flapping).

Pure logic, no Home Assistant imports, so it can be unit-tested outside
pyscript. `pyscript/flap_monitor.py` feeds it state changes.
"""
from collections import deque


class FlapDetector:
    """Counts drops to unavailable per entity in a sliding time window.

    `record()` returns True once per alert: when an entity reaches
    `threshold` drops within `window_s` seconds and has not been alerted on
    in the last `cooldown_s` seconds.
    """

    def __init__(self, threshold, window_s, cooldown_s):
        if threshold < 1:
            raise ValueError("threshold must be at least 1")
        self.threshold = threshold
        self.window_s = window_s
        self.cooldown_s = cooldown_s
        self._drops = {}
        self._last_alert = {}

    def _prune(self, drops, now):
        while drops and now - drops[0] > self.window_s:
            drops.popleft()

    def record(self, entity_id, now):
        """Record a drop to unavailable at `now` (seconds). Returns True to alert."""
        drops = self._drops.setdefault(entity_id, deque())
        drops.append(now)
        self._prune(drops, now)
        if len(drops) < self.threshold:
            return False
        last = self._last_alert.get(entity_id)
        if last is not None and now - last < self.cooldown_s:
            return False
        self._last_alert[entity_id] = now
        return True

    def count(self, entity_id, now):
        """Number of drops for `entity_id` inside the window ending at `now`."""
        drops = self._drops.get(entity_id)
        if not drops:
            return 0
        self._prune(drops, now)
        return len(drops)
