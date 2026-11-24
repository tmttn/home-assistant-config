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

Added on 2026-11-24. iOS gives no app (the HA Companion app included) access to the Clock alarms, and the iOS app has
no next-alarm sensor (Android only). Tom's alarm is the **sleep schedule** wake-up alarm, which Shortcuts cannot read
without changing it: **Find Alarms** leaves it out, and **Edit Sleep Alarm** ("Slaapwekker aan/uit") is the only
action that returns it.

Tom uses the Shortcut from the HA community thread "Sync iOS 26+ sleep alarm to HA (companion app 2026.7+)",
unchanged except for the helper name in its dictionary: `input_datetime.tom_iphone_sleep_alarm`. It toggles the sleep
alarm twice, reads the next wake-up time and sends it with `input_datetime.set_datetime`.

iPhone automation (Run Immediately): daily at 04:00, so changes made in the evening or after midnight still count.
The heating starts 30 min before the alarm, so an alarm before about 04:35 is synced too late for it; until the
04:00 run the sensor keeps the previous sync's time.

`sensor.next_alarm` (template helper) now picks:

1. the next occurrence of the helper's **time** (its date is ignored, since the Shortcut's date can be off), when
   the helper was written in the last 36 h (`last_reported`) and is not `1970-01-01` (never synced). The time stays
   "today" until 1 h after it passes, so time triggers on the sensor are not cancelled at the alarm minute;
2. otherwise the next block of `schedule.alarm_clock_schedule`, as before.

Consumers: "Alarm clock: wake up with light" fires at `sensor.next_alarm` (was `schedule.block_started`), the
espresso machine 10 min before it (was the block start, despite its name), the heating 30 min before it (unchanged).

Known risks from that thread and the Apple Developer Forums: on a day the schedule has no alarm (or after a one-off
change) the second toggle can leave the alarm off, and the Perform action step can turn into "unknown action" after
iOS or app updates (delete and re-add it). A sync that stops falls back to the schedule after 36 h.

"Alarm clock: warn when the iPhone alarm sync did not run" checks at 04:30: if the helper has synced before but was
not written in the last hour, Tom gets a passive push with the time HA now uses and a hint to look for "Onbekende
taak" in the Shortcut. A Home Assistant restart between 03:30 and 04:30 resets `last_reported` and hides one miss.

## Medication: Apple Health reminder from the kitchen button

Added on 2026-11-24. The first press of the day of the kitchen medication button now also pushes to Tom
(`notify.mobile_app_bizzyphone`, tag `medication_health_log`) with a tap that opens Health (`x-apple-health://`);
the dose is logged there under Browse → Medications. Logging it automatically is not possible: Shortcuts has no
medication action and the HealthKit medications API (WWDC25) is documented for reading medications and doses, not logging them.

The 12:15 reminder push ("Medication: Tom medication reminder") has a "Genomen" button (`MEDICATION_TAKEN`).
"Medication: Tom medication taken from the phone" marks `input_boolean.tom_medication` like the kitchen button and
replaces the reminder with the same tap-to-open-Health push. All three pushes share tag `medication_health_log`, so a
kitchen press also replaces an open reminder.

## Night mode: ask to sleep when a Sleep focus starts

Added on 2026-11-24. When Tom's or Tanja's iPhone turns on a Focus (`binary_sensor.bizzyphone_focus`,
`binary_sensor.t_phone_focus`) between 20:00 and 03:00 and guest mode is off, that phone gets "Slapen?" (tag
`sleep_focus_prompt`), if its owner is home:

- sleep mode off: "Iedereen slaapt" (`SLEEP_FOCUS_TOTAL`, runs `script.going_to_sleep`) and "Alleen ik (half)"
  (`SLEEP_FOCUS_HALF`, sets `half`: one goes up, others stay up downstairs);
- sleep mode already half: only "Iedereen slaapt".

It asks instead of acting because someone else may still be up. Pushes are cleared on both phones once sleep mode
reaches total. Tom's push adds a line when his battery is below 30 % and not charging (the alarm and the 04:00 sync
need the phone); it is sent on its own when there is nothing to ask. Tanja's phone reports no battery sensor.

iOS does not share the focus name (`sensor.bizzyphone_focus_name` stays empty), so the time window stands in for "it
is the Sleep focus". In the week before, Tom's focus turned on between 22:39 and 23:18 and sleep mode was set by hand
10 min to 2 h later (one night not at all). Tanja's turned on between 22:02 and 22:15; on 3 of 7 nights her daytime
Focus ran on into the night, so there was no evening off -> on and no question.

Not built: Wi-Fi (`sensor.bizzyphone_ssid`) as a faster arrival signal. Over 7 days GPS reported home 30 s to 4 min
before the phone joined "MetGen Net", so it would not speed anything up.

## Night mode: half vs total

`half` = someone went to bed while others are still up downstairs; `total` = everyone sleeps. Adjusted on 2026-11-24:

- "Night mode: goodnight check" now runs when sleep mode reaches `total` (from off or half), not on `half`. At half,
  open doors and downstairs lights are expected; the check belongs to the moment the last one goes to bed, including
  the automatic half -> total after 1 h without activity outside the bedroom. That late push uses the default level,
  which the Sleep focus silences.
- "Car: announce the Tesla is almost home" also speaks at `half` (the Kitchen Display is downstairs, where someone is
  still up); it stays silent at `total` and after 22:00.
- Unchanged, already right for half: arming the alarm (home) and the low heating setpoint only happen at `total`;
  adaptive lighting has its own half profile.
