# Utility run tracking: washing machine and espresso machine

Two UI automations track each run of the washing machine and the espresso
machine and send a "done" push when a run ends. They live in
`automations.yaml`, which is not in this repo, so this page records how they
work.

## Utilities: track washing machine and espresso machine runs

Mode `queued` (max 10). Nothing waits in memory: every run compares
`binary_sensor.<name>` with persistent helpers, so a Home Assistant restart
cannot drop a notification.

| Helper | Meaning |
| --- | --- |
| `input_datetime.<name>_on` | when the current or last run started |
| `input_datetime.<name>_off` | when the last run was handled as done |
| `input_number.<name>_energy_at_start` | `sensor.<name>_energy` at the start |

A run is in progress while `_on` is later than `_off`.

| Trigger | Checks |
| --- | --- |
| binary sensor → `on` | that sensor |
| binary sensor `on` → `off` | that sensor |
| binary sensor `off` for 5 minutes | that sensor (end that came via unavailable) |
| event `utility_runs_reconcile` | all devices |

- `on` and no run in progress: stamp `_on` and the start energy.
- `off` and a run in progress: stamp `_off` first (so a second run cannot
  push twice), then push "done after N minutes, X kWh (€Y)" to
  `sensor.nearest_iphone_notify`. The push is time-sensitive unless sleep
  mode is on.

The espresso machine has no "started" push on purpose.

## Utilities: reconcile utility runs after startup

Mode `single`. On Home Assistant start it waits 5 minutes so the plugs and
power sensors are back, then fires `utility_runs_reconcile`.

The delay lives here, not in the tracker. In the tracker a 5-minute delay
held the `queued` run, so a real "off" right after a restart waited behind it
for up to 5 minutes before the push went out.

## Timing of the "done" push

`binary_sensor.espresso_machine` (power > 3 W) turns off 3 minutes after the
power drops, `binary_sensor.washing_machine` (Miele status) 1 minute after the
run ends (`delay_off` in `includes/template.yaml`). After a restart the
template sensor comes back with its last state and starts that delay again,
so a restart inside the window moves the push to that delay after the
restart.
