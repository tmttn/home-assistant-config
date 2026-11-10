# Ring alarm: automatic arm and disarm

`alarm_control_panel.bunderhome_alarm` (Ring, through ring-mqtt) is armed and
disarmed by two UI automations. They live in `automations.yaml`, which is not
in this repo, so this page records how they work.

The Ring panel only supports **arm home** and **arm away**
(`supported_features: 3`); there is no night mode. Arm home is used for the
night. Ring's own "Nacht" schedule in the Ring app still arms home at 23:15;
the automations below work alongside it.

## Security: arm the alarm when everyone has left or goes to sleep

| Trigger | Extra conditions | Action |
| --- | --- | --- |
| `binary_sensor.no_one_home` on for 5 minutes | guest mode off, still no one home, alarm disarmed or armed home | arm away |
| `input_select.sleep_mode` → `total` | someone home, alarm disarmed | arm home |

- When a Ring door contact (`binary_sensor.openclose_*`) is open, it does not
  try to arm (Ring rejects it, and bypass is set to "Never"); it pushes which
  doors are open instead.
- After the arm call it waits up to 90 seconds for Ring to report `arming`,
  `armed_away` or `armed_home`. If Ring doesn't report one, it pushes a failure
  (time-sensitive), for example when ring-mqtt is briefly `unavailable`.
- Arming lives in its own automation, not in `script.leaving`. That script
  also runs from the back door button and the "turn off everything" push,
  where someone may still be home.
- It uses `input_select.sleep_mode` rather than `input_boolean.sleep_mode`.
  `half` means someone is still up, so only `total` arms.

## Security: disarm the alarm when someone arrives or night mode ends

| Trigger | Extra conditions | Action |
| --- | --- | --- |
| `binary_sensor.anyone_home` occupancy detected | alarm arming, armed away or armed home | disarm |
| `input_select.sleep_mode` `half`/`total` → `off` | someone home, alarm armed home | disarm |

Sleep mode turns off when the wake-up alarm stops, or at 09:00 ("Night mode:
automatically turn off when alarm turns off or at 9AM"). An alarm that was
armed away stays armed then. The automation waits up to 60 seconds for
`disarmed` and pushes the result.

All pushes go to `notify.all_iphones` with the title "Security". Arming or
disarming by hand or by the Ring schedule sends no push from Home Assistant.

## Security: motion detected but we are not home

This automation stays. It watches `binary_sensor.motion_detected`, the
room-activity sensors that are not Ring devices, and offers a "Sound alarm"
action. Ring only covers its own contact and motion sensors, so this still adds
coverage when the alarm is armed away.
