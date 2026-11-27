# Home routines

UI automations (in `automations.yaml`, not in this repo) added on 2026-11-14.

## Weather: coat advice on school mornings

08:00 on workdays (`binary_sensor.workday_sensor`), someone home and sleep mode off: the Kitchen Display says how
warm Marthe should dress for the school run to Talentenhuis Beverst and whether rain comes before pick-up. It reads
the hourly forecast (`weather.get_forecasts`) for 08:00–15:30 (Wednesdays 12:30) and uses the "feels like"
temperature: below 3 °C winter coat with hat and gloves, below 10 °C warm coat, below 16 °C light jacket. Rain from
0.2 mm/h names the hour; gusts from 50 km/h add a wind warning. School holidays are not in the workday sensor, so it
also speaks on holiday weekdays.

## Climate: ventilation advice for bathroom and storage

Triggers when `sensor.multi_sensor_bathroom_humidity` stays above 70 % for 15 min or
`sensor.multi_sensor_storage_humidity` above 65 % for 6 h. It compares indoor and outdoor absolute humidity (g/m³,
Magnus formula; outdoor temperature and humidity from the hourly forecast, because the weather station's outdoor
sensor is offline) and pushes "Ventileren helpt" or "Niet ventileren" (`notify.all_iphones`). Someone home,
08:00–22:00, sleep mode off, at most once per 3 h.

A freshness guard skips readings older than 2 hours: the Aqara multi-sensors drop off Zigbee without going
`unavailable`, and MQTT then replays their last retained value after every restart.

## System: climate sensor stopped reporting

10:00 daily: push to Tom when one of the three Aqara multi-sensors (bathroom, storage, Marthe bedroom) has not
reported for 6 h. The flap monitor (`pyscript/flap_monitor.py`) only sees `unavailable`, which these never become.

On 2026-11-14 all three were found dead: Zigbee2MQTT last saw them on 2025-08-13 (bathroom), 2025-09-01 (storage)
and 2025-09-13 (Marthe bedroom). Their HA values (57.18 %, 54.54 %, 56.87 %) are from then. Re-pair: permit join in
Zigbee2MQTT, then hold the sensor's button about 5 s until the LED blinks. The old trend helpers
(`binary_sensor.humidity_*_rising`, `sensor.humidity_*_derivative`) are unavailable for the same reason.

## Energy: weekly house report

Sunday 20:00, `notify.all` (tag `weekly_house_report`): solar yield and self-consumption, grid import and export,
gas, Tesla charging (`sensor.bizzylectric_energy_added`), an estimated cost and this month's peak demand. Week
totals come from `recorder.get_statistics` (period `week`, type `change`) on the Energy dashboard statistics, so
restarts don't matter. Cost = import × the tariff sensors + gas × `sensor.gas_price` − export ×
`sensor.electricity_price_injection`; fixed costs and the capacity tariff are left out.

## Climate: away setback with a "turn back on" button

After 45 min with nobody home, "Climate: lower the heating when everyone has left" drops the heating to
`input_number.temperature_low` and pushes to `notify.all_iphones` (tag `heating_away_setback`). The push has a
"Verwarming terug aanzetten" button (action `HEATING_AWAY_RESTORE`) for short trips.

"Climate: restore the heating when someone comes home" handles the button with an event trigger, so it works hours
later and survives restarts (no `wait_for_trigger`). It restores the schedule setpoint: high 11:00–23:30, moderate
05:00–11:00, and moderate at night (arrival alone does nothing at night). It only raises, never lowers, and
replaces the push with "Verwarming staat terug aan". Coming home later still runs the normal arrival restore; the
setback does not fire again until the house is occupied and then empty for 45 min.

## Alarm clock: follow Tom's iPhone sleep alarm

Added on 2026-11-24. iOS gives no app (the HA Companion app included) access to the Clock alarms, and the
sleep-schedule alarm is not even returned by Shortcuts' Find Alarms. Only "Edit/Toggle Sleep Alarm" returns it.
The community Shortcut "Sync iOS 26+ sleep alarm to HA (companion app 2026.7+)" (renamed "HA sync iOS 27 sleep
alarm" on Tom's iPhone) uses that and writes the alarm into `input_datetime.tom_iphone_sleep_alarm`. A personal
iPhone automation runs it daily at 04:00 (Run Immediately), so late changes the evening before are caught.

The Shortcut's date is one day ahead: at 04:00 on day D it writes D+1, but the time is D's alarm (checked on
2026-11-26: written "27 Nov 07:00", iPhone rang 26 Nov 07:00). `sensor.next_alarm` (template helper) therefore
uses only the hour and minute:

1. when the helper has synced (year >= 2000) and was written in the last 36 h (`last_reported`): that time today,
   or tomorrow once it is more than 1 h past (the 1 h keeps time triggers on the sensor from being cancelled at
   the alarm minute);
2. otherwise the next block of `schedule.alarm_clock_schedule`.

Consumers: "Alarm clock: wake up with light" starts the guest bedroom sunrise 10 min before `sensor.next_alarm` and
ends sleep mode at it, the espresso machine starts 10 min before it, the heating 30 min before it. "Alarm clock: warn when the iPhone alarm sync did not run" sends a passive push at
04:30 when the helper was not written in the last hour. Shared copies of the Shortcut show its Home Assistant step
as "Onbekende taak": re-add "Perform Action" `input_datetime.set_datetime` with the Dictionary variable as data.

## Alarm clock: wake-up light in the guest bedroom

`pyscript.wake_up_light` (`pyscript/wake_up_light.py`) raises `light.guest_bedroom_lights` over 600 s from dim red
to warm white; Home Assistant converts the colour for the colour-temperature ceiling lights and the
brightness-only bedside lamp. `input_boolean.wake_up_light` is on while it runs. Turning the light off stops the
sunrise, and it is skipped in guest mode. Until 2026-11-27 nothing ran it: the automation only turned the boolean
on, which an AppDaemon app removed in November 2023 used to watch.

## Night mode: ask to sleep when a Sleep focus starts

When Tom's or Tanja's iPhone turns on a Focus between 20:00 and 03:00 (iOS does not share the Focus name), that
phone gets a push "Slapen? 🌙" with "Iedereen slaapt" (`script.going_to_sleep`) and, when sleep mode is off,
"Alleen ik (half)". It stays silent when sleep mode is already `total`, the person is not home, or guest mode is
on. Tom's push adds a battery warning below 30 % when not charging (the 04:00 sync and the alarm need the phone),
and that warning is sent on its own when there is nothing to ask. Once sleep mode reaches `total`, by a button or
any other way, the push is cleared on both phones, so it disappears within seconds when sleep mode is set right
after the Focus turns on.

## Medication: Apple Health reminder from the kitchen button

Added on 2026-11-24. The first press of the day of the kitchen medication button now also pushes to Tom
(`notify.mobile_app_bizzyphone`, tag `medication_health_log`) with a tap that opens Health (`x-apple-health://`);
the dose is logged there under Browse → Medications. Logging it automatically is not possible: Shortcuts has no
medication action and the HealthKit medications API (WWDC25) is documented for reading medications and doses, not logging them.
