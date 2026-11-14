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
