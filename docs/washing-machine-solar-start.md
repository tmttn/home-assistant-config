# Washing machine solar start

The automation **Utilities: start washing machine on solar**
(`automation.utilities_start_washing_machine_on_solar`) starts the Miele
washing machine remotely around the solar production peak. It lives in Home
Assistant storage, like the other automations; this page documents it.

## How to use it

### Mobile Control (the usual way)

1. Load the machine and turn the program dial to **MobileControl**
   (`binary_sensor.washing_machine_mobile_start` turns on,
   `sensor.washing_machine_program` stays `no_program`).
2. **Utilities: ask washing machine program on mobile control**
   (`automation.utilities_ask_washing_machine_program_on_mobile_control`)
   pushes "Which program?" with the buttons **Delicaat**, **Katoen** and
   **Handdoeken**. The answer goes into
   `input_select.washing_machine_solar_start_program`.
3. The answer arms the solar start below: it plans the start and pushes
   "Washing machine (Delicaat) will start at ~HH:MM on solar".
4. At that moment it calls `miele.set_program` and pushes the program,
   temperature and spin speed the machine actually runs.

Leaving Mobile Control (Mobile Start off for a minute) resets the choice to
`Geen`.

**Limits of the Miele API.** `miele.set_program` selects *and starts* the
program at once: there is no "select now, start later", so it is only called
at the solar moment. It takes a program id only: temperature and spin speed
cannot be sent (`miele.get_programs` lists no parameters). The machine uses
the program's defaults (Delicates: 40 °C / 900 rpm), or, with the machine
setting **Memory** on, the settings of the last run of that program. Towels
have no program of their own and run as Cottons, so Katoen and Handdoeken
share one Memory.

| Button | Miele program | `program_id` |
| -------- | --------------- | -------------- |
| Delicaat | Delicates | 4 |
| Katoen | Cottons | 1 |
| Handdoeken | Cottons | 1 |

`miele.get_programs` lists the other programs and their ids.

### Mobile Start with a program picked on the machine

1. Load the machine, pick a program, temperature and spin speed on the
   machine and enable **Mobile Start** (`button.washing_machine_start`
   becomes available). No program push is sent.
2. Home Assistant plans the start and pushes "Washing machine will start at
   ~HH:MM on solar".
3. At that moment it presses `button.washing_machine_start` and pushes
   "Washing machine started on …". If the machine is not running five minutes
   later, or Miele offers no start, the push says so.

Turning Mobile Start off cancels the plan: every trigger requires it to be on.
In Mobile Control without a chosen program the automation does nothing: it
waits for the answer to the program push.

## When it starts

The planned time is an hour before Forecast.Solar's peak
(`sensor.power_highest_peak_time_today`), so a typical run straddles the peak,
clamped between now and the deadline:

| Armed | Start |
| ------- | ------- |
| Before the planned time | At the planned time |
| After the planned time, before the deadline (15:00) | Right away: the best sun of today is now or just behind |
| After the deadline, tomorrow forecast sunny (`sensor.energy_production_tomorrow` ≥ 5 kWh) | Tomorrow, an hour before tomorrow's peak (at the latest at tomorrow's deadline) |
| After the deadline, tomorrow forecast grey (< 5 kWh) | Right away: waiting for tomorrow gains nothing |

After the deadline the choice depends on the sun, not on the clock, so there
is no evening cut-off where a minute decides between now and tomorrow.

It starts earlier than planned when the measured PV power of the SMA Sunny
Boy 3.0 inverter (`sensor.sb3_0_1av_41_570_pv_power`) stays above the
threshold for 5 minutes, or is already above it when you arm the machine. It
always starts at the deadline, so the laundry still gets done on cloudy days.

## Settings (helpers, editable in the UI)

| Helper | Default | Meaning |
| -------- | --------- | --------- |
| `input_datetime.washing_machine_solar_start_deadline` | 15:00 | Latest start of the day |
| `input_number.washing_machine_solar_start_sunny_tomorrow` | 5 kWh | Tomorrow's forecast from which waiting for tomorrow is worth it (November averages ~7 kWh/day, May ~18) |
| `input_number.washing_machine_solar_start_threshold` | 2000 W | Start early once the measured PV power passes this (the inverter peaks at 3 kW) |
| `input_datetime.washing_machine_solar_start_planned` | – | The planned start; written by the automation |
| `input_select.washing_machine_solar_start_program` | Geen | Program for Mobile Control (Geen, Delicaat, Katoen, Handdoeken); set by the program push, reset after the start |

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
