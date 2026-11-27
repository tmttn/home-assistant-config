"""Emulates a Philips Wake-up Light / sunrise.

This cycles through a sequence of RGB tuples and then
linearily interpolates them in HSV color space as time
proceeds. Lights that only support color temperature or
brightness get the converted value from Home Assistant.

The routine can be triggered a service `pyscript.wake_up_light`.

The sequence is canceled by turning the light off.

Adaptive Lighting is told the lights are manually controlled before the
first step, so it does not pull them to its own (sleep) brightness while
the sunrise runs. Turning the light off, or a sleep mode change such as
the one at the alarm, hands the lights back to Adaptive Lighting.

pyscript does not support generator expressions; use plain loops.
"""
import sys
sys.path.append("/config/pyscript")

from python_modules.wake_up_light import rgb_and_brightness

DEFAULT_LAMP = "light.ceiling_living_room"
DEFAULT_TOTAL_TIME = 900

RGB_SEQUENCE = [
    (255, 0, 0),
    (255, 0, 0),
    (255, 63, 0),
    (255, 120, 0),
    (255, 187, 131),
    (255, 205, 166),
]

MIN_TIME_STEP = 2  # time between settings

# Any Adaptive Lighting switch works: manual control is tracked per light
# across all switches. Light groups are expanded to their members.
AL_SWITCH = "switch.adaptive_lighting_default"


def _as_list(value):
    if isinstance(value, (list, tuple)):
        return list(value)
    return [value]


def _canceled(lamps):
    for lamp in lamps:
        if state.get(lamp) == "off":
            return True
    return False


def _hold_adaptive_lighting(lamps):
    try:
        adaptive_lighting.set_manual_control(
            entity_id=AL_SWITCH,
            lights=lamps,
            manual_control=True,
        )
    except Exception as exc:
        log.warning(f"wake_up_light: could not pause Adaptive Lighting: {exc}")


@service
def wake_up_light(
    lamp=DEFAULT_LAMP,
    total_time=DEFAULT_TOTAL_TIME,
):
    """yaml
name: Wake Up Light
description: Slowly brighten a light like a sunrise.
fields:
  lamp:
    description: Light entity, or a list of them.
    example: light.guest_bedroom_lights
  total_time:
    description: Seconds until full brightness.
    example: 600
"""
    lamps = _as_list(lamp)
    total_time = int(total_time)
    rgb, brightness = rgb_and_brightness(total_time, RGB_SEQUENCE)
    steps = min(total_time // MIN_TIME_STEP, 255) + 1
    transition = total_time / (steps - 1)
    _hold_adaptive_lighting(lamps)
    t = 0
    for step in range(steps):
        if step > 0 and _canceled(lamps):
            log.info(f"wake_up_light: canceled after {round(t)} s")
            break
        light.turn_on(
            entity_id=lamps,
            rgb_color=rgb(t),
            brightness=brightness(t),
            transition=transition,
        )
        task.sleep(transition)
        t = min(t + transition, total_time)
