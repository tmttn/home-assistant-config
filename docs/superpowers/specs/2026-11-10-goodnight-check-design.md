# Goodnight check

Live in Home Assistant storage (category "Night mode"), managed through the `ha-config` MCP server:

| Automation | Entity |
| --- | --- |
| Night mode: goodnight check | `automation.night_mode_goodnight_check` |
| Night mode: goodnight check actions | `automation.night_mode_goodnight_check_actions` |

## Trigger

`input_select.sleep_mode` going from `off` to `half` or `total` (what `script.going_to_sleep` and the
dashboard set). `half` → `total` does not re-run the check. `input_boolean.sleep_mode` is not used: no
automation, script or dashboard references it, and its state does not follow the real sleep mode.

The check waits 20 s first: `script.going_to_sleep` turns the living room, bedroom, bathroom and guest
bedroom lights off 5 s after selecting the mode, with a 4 s transition.

## Checks

| Check | Source | Line in the push | Button |
| --- | --- | --- | --- |
| Doors open | `binary_sensor.openclose_{front,back,storage,living_room}_door` | 🚪 Open: Voordeur, … | — |
| Tesla unlocked (home only) | `lock.bizzylectric_doors` | 🔓 Tesla niet op slot | Op slot → `lock.lock` |
| Tesla windows open (home only) | `binary_sensor.bizzylectric_windows`, `cover.bizzylectric_windows` | 🪟 Tesla-ramen open | Ramen dicht → `cover.close_cover` |
| Tesla trunk open (home only) | `cover.bizzylectric_trunk` | 🚗 Tesla-koffer open | Koffer dicht → `cover.close_cover` |
| Tesla frunk open (home only) | `cover.bizzylectric_frunk` | 🚗 Tesla-frunk open | — (cannot be closed remotely) |
| Downstairs/outside lights on | living room (+ sub-groups), terrace, kitchen (manual only) | 💡 Licht aan: Woonkamer, … | Lichten uit → `light.turn_off` |
| Waste next morning | `sensor.limburg_net_morgen` (00:00–06:00: `sensor.limburg_net_vandaag`) ≠ `Geen` | 🗑️ Morgen afval: … (buiten gezet?) | — |

"Home" means `device_tracker.bizzylectric_location_tracker` is `home`.

Terrace lights are skipped before midnight: "Light: turn off outside lights" switches
`light.outside_lights` off at 00:00, so reporting them would be noise. After midnight they are reported.

Lights that switch off by themselves are not reported: the toilet (motion + 5 min timer), the Ring
front garden and porch lights (own motion sensor and timer), and the kitchen when motion turned it on
(5 min timer). The kitchen is only reported while `timer.kitchen_ceiling_lights_turned_on_manually` is
active, i.e. someone switched it on by hand. The "Lichten uit" button still turns off the full set.

Going to sleep between 00:00 and 06:00 belongs to the previous evening: the waste line then reads
`sensor.limburg_net_vandaag`, because "tomorrow" already moved a day. The push keeps saying "Morgen
afval" either way; from the sleeper's point of view it is still the next morning's pickup.

The waste line only mentions the pickup; the separate waste reminder automation owns the reminder logic.

## All OK → silent

When nothing is wrong, no push is sent. A nightly "Alles dicht 🌙" would arrive every evening and
train us to swipe it away, which defeats the push on the night something is actually open. Each run
still leaves a trace, so a silent night can be checked afterwards.

## Notification

One push to `notify.all` (both phones), title "Welterusten-check 🌙", one line per finding, tag
`goodnight_check`. Buttons only appear for findings they can fix. Action ids are prefixed
`GOODNIGHT_` and handled by the companion automation (`mode: queued`).
