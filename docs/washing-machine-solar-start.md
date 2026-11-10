# Washing machine solar start

The automation **Utilities: start washing machine on solar**
(`automation.utilities_start_washing_machine_on_solar`) starts the Miele
washing machine remotely around the solar production peak. It lives in Home
Assistant storage, like the other automations; this page documents it.

## How to use it

1. Load the machine, pick a program and enable **Mobile Start** on the machine
   (`binary_sensor.washing_machine_mobile_start` turns on and
   `button.washing_machine_start` becomes available).
2. Home Assistant plans the start and pushes "Washing machine will start at
   ~HH:MM on solar".
3. At that moment it presses `button.washing_machine_start` and pushes
   "Washing machine started on …". If the machine is not running five minutes
   later, or Miele offers no start, the push says so.

Turning Mobile Start off cancels the plan: every trigger requires it to be on.

## When it starts

The planned time is an hour before Forecast.Solar's peak
(`sensor.power_highest_peak_time_today`), so a typical run straddles the peak,
clamped between now and the deadline:

| Armed | Start |
|-------|-------|
| Before the planned time | At the planned time |
| After the planned time, before the deadline | Right away |
| After the deadline | Tomorrow, an hour before tomorrow's peak (at the latest at tomorrow's deadline) |

It starts earlier than planned when the forecast production
(`sensor.power_production_now`) rises above the threshold, and always at the
deadline, so the laundry still gets done on cloudy days.

## Settings (helpers, editable in the UI)

| Helper | Default | Meaning |
|--------|---------|---------|
| `input_datetime.washing_machine_solar_start_deadline` | 15:00 | Latest start of the day |
| `input_number.washing_machine_solar_start_threshold` | 2500 W | Start early once the forecast production passes this |
| `input_datetime.washing_machine_solar_start_planned` | – | The planned start; written by the automation |

The lead time (60 minutes before the peak) is the `lead_minutes` variable in
the automation.

## Restart safety

Nothing waits in memory. The plan is stored in
`input_datetime.washing_machine_solar_start_planned` and fired by a time
trigger on that helper. Two minutes after a Home Assistant start the
automation re-checks: a plan still in the future is left to its trigger, a
plan from today that was missed is started, and anything else is planned
afresh. Starting stamps the helper with the start time, which uses the plan
up.

The run itself (start and done timestamps, energy, the "done" push) stays
with **Utilities: track washing machine and espresso machine runs**, which
sees the start through `binary_sensor.washing_machine`. This automation does
not touch its helpers.
