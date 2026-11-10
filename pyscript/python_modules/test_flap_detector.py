"""Run with: python3 -m pytest pyscript/python_modules/test_flap_detector.py"""
import pytest

from flap_detector import FlapDetector


def make():
    return FlapDetector(threshold=3, window_s=3600, cooldown_s=6 * 3600)


def test_alerts_when_threshold_reached_within_window():
    d = make()
    assert d.record("cover.x", 0) is False
    assert d.record("cover.x", 100) is False
    assert d.record("cover.x", 200) is True


def test_old_drops_fall_out_of_window():
    d = make()
    d.record("cover.x", 0)
    d.record("cover.x", 100)
    assert d.record("cover.x", 3801) is False
    assert d.count("cover.x", 3801) == 1


def test_cooldown_suppresses_repeat_alerts_then_expires():
    d = make()
    for t in (0, 10, 20):
        d.record("cover.x", t)
    assert d.record("cover.x", 30) is False
    for t in (6 * 3600 + 20, 6 * 3600 + 25):
        d.record("cover.x", t)
    assert d.record("cover.x", 6 * 3600 + 30) is True


def test_entities_are_counted_separately():
    d = make()
    d.record("cover.x", 0)
    d.record("cover.x", 1)
    assert d.record("light.y", 2) is False
    assert d.record("cover.x", 3) is True


def test_rejects_threshold_below_one():
    with pytest.raises(ValueError):
        FlapDetector(threshold=0, window_s=1, cooldown_s=1)
