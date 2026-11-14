# EV charging (Bizzylectric)

All automations and helpers below live in Home Assistant storage (UI), not in this repo.
The car charges on **1 phase**: ~230 W per amp, 5 A up to the wall charger's max (13 A).

## Integration: Teslemetry

The car runs on the core **Teslemetry** integration (since 2026-11-10). It replaced the HACS
`tesla_custom` integration, which talked to Tesla's legacy Owner API that Tesla is phasing out.

- Subscription: Teslemetry **Access** plan, ~€32/year per vehicle. Includes streaming
  (Fleet Telemetry, no cost per update) and 500 command credits/month (command = 1, wake = 20).
  Extra credits: €2.70 per 2000, never expire. Usage is visible in the Teslemetry console.
- The Teslemetry virtual key must be paired with the car (`https://tesla.com/_ak/teslemetry.com`,
  opened on the phone with the Tesla app). Without it, commands such as charge current fail.
- Data streams, so no polling-interval changes are needed. The integration never wakes a
  sleeping car for data; commands do.
- Teslemetry gave its entity IDs an `outside_` (area) prefix. The ones the automations and
  dashboards use were renamed to `bizzylectric_*`; the rest keep the prefix.

### Entities used

| Entity | Meaning |
| ------ | ------- |
| `binary_sensor.bizzylectric_charge_cable` | Cable plugged in |
| `sensor.bizzylectric_charging` | Charging state enum: `starting`, `charging`, `stopped`, `complete`, `disconnected`, `no_power` |
| `switch.bizzylectric_charge` | Start/stop charging |
| `number.bizzylectric_charge_current` | Charge current (A). Its `max` attribute is the wall charger's limit (13 A here); every automation caps at it, because Teslemetry rejects higher values |
| `number.bizzylectric_charge_limit` | Charge limit (%) |
| `sensor.bizzylectric_charger_current` / `sensor.bizzylectric_charger_power` | Actual draw (A / kW) |
| `sensor.bizzylectric_battery_level`, `sensor.bizzylectric_ideal_battery_range` | Battery % and range |
| `sensor.bizzylectric_energy_added` | Energy added per session (kWh, `total_increasing`); Energy dashboard device. Teslemetry's *Charge energy added*, renamed to the old tesla_custom ID so the long-term statistics continue |
| `device_tracker.bizzylectric_location` | Location (`home` gates all charging logic) |
| `lock.bizzylectric_lock`, `cover.bizzylectric_vent_windows`, `binary_sensor.bizzylectric_*_window`, `cover.bizzylectric_trunk`, `cover.bizzylectric_frunk` | Goodnight check |

### Mapping from tesla_custom

| tesla_custom | Teslemetry |
| ------------ | ---------- |
| `binary_sensor.bizzylectric_charger` | `binary_sensor.bizzylectric_charge_cable` |
| attribute `charging_state: Complete` | `sensor.bizzylectric_charging` = `complete` |
| `binary_sensor.bizzylectric_charging` (on) | `sensor.bizzylectric_charging` = `charging` |
| `switch.bizzylectric_charger` | `switch.bizzylectric_charge` |
| `number.bizzylectric_charging_amps` | `number.bizzylectric_charge_current` |
| attribute `charger_amps_actual` | `sensor.bizzylectric_charger_current` |
| `sensor.bizzylectric_battery` | `sensor.bizzylectric_battery_level` |
| `sensor.bizzylectric_range` | `sensor.bizzylectric_ideal_battery_range` |
| `device_tracker.bizzylectric_location_tracker` | `device_tracker.bizzylectric_location` |
| `lock.bizzylectric_doors` | `lock.bizzylectric_lock` |
| `cover.bizzylectric_windows`, `binary_sensor.bizzylectric_windows` | `cover.bizzylectric_vent_windows`, `binary_sensor.bizzylectric_*_window` |
| `tesla_custom.polling_interval` | not needed (streaming) |

`tesla_custom` (integration, HACS repo and its three scripts) was removed on 2026-11-10 after a
verified plug-in pause and boost session on Teslemetry. Going back would mean reinstalling it and
logging in again; the old automation configs are in the ha-mcp `edits` backups of that day.

## Helpers

| Entity | Purpose |
| ------ | ------- |
| `input_boolean.ev_smart_charging` | Master switch for solar/night charging. Off = the car charges natively on plug-in. |
| `input_boolean.ev_charge_full_now` | Boost: keep the car charging up to its charge limit now (or from the next plug-in at home), at peak-safe amps. Turns itself off when the session ends. |
| `input_select.ev_charging_session` | Current session: `idle`, `solar`, `night`, `boost`. Restart-safe state. |
| `input_number.ev_minimum_battery` | Night fallback when the battery is below this (default 30 %). |
| `input_number.ev_minimum_solar_forecast` | Night fallback when the coming day's Forecast.Solar estimate is below this (default 8 kWh). |
| `sensor.ev_peak_safe_charging_amps` | Template helper: highest amps that keep grid import under this month's peak demand (min 2.5 kW) minus 300 W, capped at the charger's max. House load = grid minus `sensor.bizzylectric_charger_current` × 230 W while charging. |

## Automations

- **Energy: EV smart charging** — session state machine.
  - Solar: start after 5 min of >1.2 kW export, stop after 10 min of >300 W import.
  - Night (22:00–07:00): only when battery or forecast is below the minimum; ends at 07:00 once the battery is above the minimum.
  - Boost: `ev_charge_full_now` on → charge until full, no sun/night rules, at peak-safe amps; charging is switched back on if it stops for 2 min. Turning it off returns to smart charging.
  - Boost peak guard: when even the 5 A minimum would set a new monthly peak
    (`sensor.ev_peak_safe_charging_amps` below 5 for 2 min, or already at boost start), charging pauses
    and a push (tag `ev_boost_paused`) says so. It resumes on its own once 6 A or more fits for 3 min
    (hysteresis 5/6 A, also checked after an HA restart); the push is cleared on resume or session end.
    A long pause can let the car sleep, so the resume command may cost a wake (20 credits).
  - Plugged in at home with no need → native charging is paused and a push
    (`notify.all`, tag `ev_plugged_in`) offers **Nu volladen** (`EV_CHARGE_FULL`), which turns boost on.
  - Ends on unplug, `complete`, car leaving home.
- **Energy: EV charging amps follow** — every minute in solar/night/boost sessions: amps += (target − grid) / 230 W; down at once, up ≤3 A/min, never above the charger max. Target −100 W (solar) or the peak cap (night, boost). Each change is one Teslemetry command credit.
- **Energy: EV charging amps too high** — push (`notify.all`) when the car charges at home above `sensor.ev_peak_safe_charging_amps` for 3 min while charging natively (`idle`), with a button to lower to the peak-safe amps or to pause. Boost no longer pushes here: it pauses itself. Max one push per 30 min.
- **Energy: EV charging amps too high actions** — handles `EV_LOWER_AMPS` / `EV_PAUSE_CHARGING`.
- **Energy: grid export too high** — skips its nag while smart charging can absorb the surplus.


## Capacity tariff

Flemish grid costs include a capacity tariff on the highest 15-minute average import of each month
(`sensor.p1_meter_peak_demand_current_month`, minimum 2.5 kW). Night and boost charging stay
300 W under that peak, so charging the car never raises it. When even 5 A does not fit (early in the month, when
the peak is still near the 2.5 kW minimum, plus a big load such as the oven), boost pauses instead of setting a new peak.
Native charging (smart charging off, session `idle`) is not steered; it only gets the amps-too-high push.

## Car comfort and reminders

Helpers: `input_boolean.ev_preheat_tomorrow` (armed by Tanja's answer), `input_datetime.ev_preheat_departure`
(time only, default 06:35, Tanja's early-shift departure) and `input_number.ev_plug_reminder_below` (50 %).

- **Car: ask Tanja to preheat the Tesla tomorrow** — 20:30, car home: if the hourly forecast is below 8 °C
  around the departure time, push to Tanja only (`notify.mobile_app_t_phone`, tag `ev_preheat`) with
  **Ja, voorverwarmen** (`EV_PREHEAT_YES`) / **Nee** (`EV_PREHEAT_NO`). Her shifts vary (early on some days, afternoon
  on others), so it asks instead of following the workday calendar.
- **Car: handle the preheat answer** — sets `input_boolean.ev_preheat_tomorrow`.
- **Car: preheat the Tesla before departure** — 20 min before the departure time, when armed and the car is home:
  `climate.bizzylectric_climate` → `heat_cool`, plus `switch.bizzylectric_defrost` below 3 °C outside. The car is on
  the charger, so the heat comes from the grid. If the car has not left within 65 min, climate goes off and Tanja
  gets a push. About 21 command credits per morning (wake + command).
- **Energy: EV plug reminder** — 21:00, or 15 min after the car parks at home until 23:30: push (`notify.all`, tag
  `ev_plug_reminder`) when the cable is out and the battery is below `ev_plug_reminder_below`. Without the cable
  smart charging cannot use tomorrow's sun.
- **Car: announce the Tesla is almost home** — template trigger on `device_tracker.bizzylectric_route` = `home`
  (Teslemetry fills it from the navigation destination) and `sensor.bizzylectric_time_to_arrival` ≤ 10 min:
  TTS on the Kitchen Display. Only when someone is home, sleep mode off, 07:00–22:00. Without navigation there is
  no ETA, so no announcement.
- **Security: Tesla Sentry follows the alarm** — see [security-alarm.md](security-alarm.md#tesla-sentry).
