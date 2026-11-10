# EV charging (Bizzylectric)

All automations and helpers below live in Home Assistant storage (UI), not in this repo.
The car charges on **1 phase**: ~230 W per amp, 5–16 A.

## Helpers

| Entity | Purpose |
| ------ | ------- |
| `input_boolean.ev_smart_charging` | Master switch for solar/night charging. Off = the car charges natively on plug-in. |
| `input_boolean.ev_charge_full_now` | Boost: keep the car charging up to its charge limit now (or from the next plug-in at home), at peak-safe amps. Turns itself off when the session ends. |
| `input_select.ev_charging_session` | Current session: `idle`, `solar`, `night`, `boost`. Restart-safe state. |
| `input_number.ev_minimum_battery` | Night fallback when the battery is below this (default 30 %). |
| `input_number.ev_minimum_solar_forecast` | Night fallback when the coming day's Forecast.Solar estimate is below this (default 8 kWh). |
| `sensor.ev_peak_safe_charging_amps` | Template helper: highest amps that keep grid import under this month's peak demand (min 2.5 kW) minus 300 W. |

## Automations

- **Energy: EV smart charging** — session state machine.
  - Solar: start after 5 min of >1.2 kW export, stop after 10 min of >300 W import.
  - Night (22:00–07:00): only when battery or forecast is below the minimum; ends at 07:00 once the battery is above the minimum.
  - Boost: `ev_charge_full_now` on → charge until full, no sun/night rules, at peak-safe amps; charging is switched back on if it stops for 2 min. Turning it off returns to smart charging.
  - Plugged in at home with no need → native charging is paused and a push
    (`notify.all`, tag `ev_plugged_in`) offers **Nu volladen** (`EV_CHARGE_FULL`), which turns boost on.
  - Ends on unplug, `Complete`, car leaving home. Polling 60 s during a session, default after.
- **Energy: EV charging amps follow** — every minute in solar/night/boost sessions: amps += (target − grid) / 230 W; down at once, up ≤3 A/min. Target −100 W (solar) or the peak cap (night, boost).
- **Energy: EV charging amps too high** — push (`notify.all`) when the car charges at home above `sensor.ev_peak_safe_charging_amps` for 3 min while charging natively (`idle`), or in `boost` when even 5 A exceeds the peak, with a button to lower to the peak-safe amps or to pause. Max one push per 30 min.
- **Energy: EV charging amps too high actions** — handles `EV_LOWER_AMPS` / `EV_PAUSE_CHARGING`.
- **Energy: grid export too high** — skips its nag while smart charging can absorb the surplus.

`script.electric_vehicle_charging_set_amps_link_to_excess_solar` is no longer used: it assumes 3-phase and ignores house load.

## Capacity tariff

Flemish grid costs include a capacity tariff on the highest 15-minute average import of each month
(`sensor.p1_meter_peak_demand_current_month`, minimum 2.5 kW). Night and boost charging stay
300 W under that peak, so charging the car never raises it.
