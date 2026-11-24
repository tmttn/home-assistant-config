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

## Alarm clock: follow Tom's iPhone alarm

Added on 2026-11-24. iOS gives no app (the HA Companion app included) access to the Clock alarms; only Shortcuts can
read them. A Shortcut on Tom's iPhone writes the times of all enabled alarms into `input_text.tom_iphone_alarms`. Every `H:MM` in the text counts, so the date format the phone
adds does not matter. Home Assistant works out which one is next, so the Shortcut needs no date logic.

`sensor.next_alarm` (template helper) now picks:

1. the earliest upcoming time from the iPhone list, when it was written in the last 36 h (`last_reported`). A time
   stays "today" until 1 h after it passes, so time triggers on the sensor are not cancelled at the alarm minute;
2. otherwise the next block of `schedule.alarm_clock_schedule`, as before. An empty sync also falls back: a Shortcut
   that silently reads no alarms looks the same as "no alarm set", and skipping the morning routine is the worse
   failure.

Consumers: "Alarm clock: wake up with light" fires at `sensor.next_alarm` (was `schedule.block_started`), the
espresso machine 10 min before it (was the block start, despite its name), the heating 30 min before it (unchanged).

### iPhone Shortcut "Wekker naar HA"

1. **Zoek wekkers** waarbij *Is ingeschakeld*.
2. **Herhaal met elk** item in Wekkers: **Formatteer datum** of *Herhaal-item → Tijd*, custom format `HH:mm`.
3. **Combineer tekst** *Herhaalresultaten* with custom separator `,`.
4. Home Assistant → **Perform Action** `input_text.set_value` with data
   `{"entity_id": "input_text.tom_iphone_alarms", "value": "<Gecombineerde tekst>"}`.

Triggers (Run Immediately): daily at 22:00 and when the Sleep focus turns on. Repeat days are not read: an
enabled alarm that skips tomorrow's weekday still counts as tomorrow's alarm.

## Medication: Apple Health reminder from the kitchen button

Added on 2026-11-24. The first press of the day of the kitchen medication button now also pushes to Tom
(`notify.mobile_app_bizzyphone`, tag `medication_health_log`) with a tap that opens Health (`x-apple-health://`);
the dose is logged there under Browse → Medications. Logging it automatically is not possible: Shortcuts has no
medication action and the HealthKit medications API (WWDC25) is documented for reading medications and doses, not logging them.
