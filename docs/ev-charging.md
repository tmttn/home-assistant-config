# EV charging (Bizzylectric)

All automations and helpers below live in Home Assistant storage (UI), not in this repo.
The car charges on **1 phase**: ~230 W per amp, 5–16 A.

## Integration: Teslemetry

The car runs on the core **Teslemetry** integration (since 2026-11-10). It replaced the HACS
`tesla_custom` integration, which talked to Tesla's legacy Owner API that Tesla is phasing out.

- Subscription: Teslemetry **Access** plan, ~€32/year per vehicle. Includes streaming
  (Fleet Telemetry, no cost per update) and 500 command credits/month (command = 1, wake = 20).
  Extra credits: €2.70 per 2000, never expire. Usage is visible in the Teslemetry console.
- The Teslemetry virtual key must be paired with the car (`https://tesla.com/_ak/teslemetry.com`,
  opened on the phone with the Tesla app). Without it, commands such as charge current fail.
- Data streams, so the old polling-interval scripts (`script.electric_vehicle_polling_interval_*`)
  are no longer called. The integration never wakes a sleeping car for data; commands do.
- Teslemetry gave its entity IDs an `outside_` (area) prefix. The ones the automations and
  dashboards use were renamed to `bizzylectric_*`; the rest keep the prefix.

### Entities used

| Entity | Meaning |
| ------ | ------- |
| `binary_sensor.bizzylectric_charge_cable` | Cable plugged in |
| `sensor.bizzylectric_charging` | Charging state enum: `starting`, `charging`, `stopped`, `complete`, `disconnected`, `no_power` |
| `switch.bizzylectric_charge` | Start/stop charging |
| `number.bizzylectric_charge_current` | Charge current (A) |
| `number.bizzylectric_charge_limit` | Charge limit (%) |
| `sensor.bizzylectric_charger_current` / `sensor.bizzylectric_charger_power` | Actual draw (A / kW) |
| `sensor.bizzylectric_battery_level`, `sensor.bizzylectric_ideal_battery_range` | Battery % and range |
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

While both integrations are installed, the colliding tesla_custom entities carry a `_legacy`
suffix (`number.bizzylectric_charge_limit_legacy`, `sensor.bizzylectric_charger_power_legacy`,
`cover.bizzylectric_frunk_legacy`, `cover.bizzylectric_trunk_legacy`, `switch.bizzylectric_sentry_mode_legacy`).

**Rollback:** ha-mcp per-edit backups of the seven automations and the peak-safe helper were taken
on 2026-11-10 before the switch (`ha_manage_backup` scope `edits`). Restore those, rename the
`_legacy` entities back, and the old setup works again as long as `tesla_custom` is installed.

## Helpers

| Entity | Purpose |
| ------ | ------- |
| `input_boolean.ev_smart_charging` | Master switch for solar/night charging. Off = the car charges natively on plug-in. |
| `input_boolean.ev_charge_full_now` | Boost: keep the car charging up to its charge limit now (or from the next plug-in at home), at peak-safe amps. Turns itself off when the session ends. |
| `input_select.ev_charging_session` | Current session: `idle`, `solar`, `night`, `boost`. Restart-safe state. |
| `input_number.ev_minimum_battery` | Night fallback when the battery is below this (default 30 %). |
| `input_number.ev_minimum_solar_forecast` | Night fallback when the coming day's Forecast.Solar estimate is below this (default 8 kWh). |
| `sensor.ev_peak_safe_charging_amps` | Template helper: highest amps that keep grid import under this month's peak demand (min 2.5 kW) minus 300 W. House load = grid minus `sensor.bizzylectric_charger_current` × 230 W while charging. |

## Automations

- **Energy: EV smart charging** — session state machine.
  - Solar: start after 5 min of >1.2 kW export, stop after 10 min of >300 W import.
  - Night (22:00–07:00): only when battery or forecast is below the minimum; ends at 07:00 once the battery is above the minimum.
  - Boost: `ev_charge_full_now` on → charge until full, no sun/night rules, at peak-safe amps; charging is switched back on if it stops for 2 min. Turning it off returns to smart charging.
  - Plugged in at home with no need → native charging is paused and a push
    (`notify.all`, tag `ev_plugged_in`) offers **Nu volladen** (`EV_CHARGE_FULL`), which turns boost on.
  - Ends on unplug, `complete`, car leaving home.
- **Energy: EV charging amps follow** — every minute in solar/night/boost sessions: amps += (target − grid) / 230 W; down at once, up ≤3 A/min. Target −100 W (solar) or the peak cap (night, boost). Each change is one Teslemetry command credit.
- **Energy: EV charging amps too high** — push (`notify.all`) when the car charges at home above `sensor.ev_peak_safe_charging_amps` for 3 min while charging natively (`idle`), or in `boost` when even 5 A exceeds the peak, with a button to lower to the peak-safe amps or to pause. Max one push per 30 min.
- **Energy: EV charging amps too high actions** — handles `EV_LOWER_AMPS` / `EV_PAUSE_CHARGING`.
- **Energy: grid export too high** — skips its nag while smart charging can absorb the surplus.

`script.electric_vehicle_charging_set_amps_link_to_excess_solar` is no longer used: it assumes 3-phase and ignores house load.

## Capacity tariff

Flemish grid costs include a capacity tariff on the highest 15-minute average import of each month
(`sensor.p1_meter_peak_demand_current_month`, minimum 2.5 kW). Night and boost charging stay
300 W under that peak, so charging the car never raises it.
