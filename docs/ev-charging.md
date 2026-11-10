# EV charging (Bizzylectric)

All automations and helpers below live in Home Assistant storage (UI), not in this repo.
The car charges on **1 phase**: ~230 W per amp, 5–16 A.

## Helpers

| Entity | Purpose |
|--------|---------|
| `input_boolean.ev_smart_charging` | Master switch for solar/night charging. Off = the car charges natively on plug-in. |
| `input_boolean.ev_charge_full_now` | Boost: charge at 16 A up to the car's charge limit now (or on the next plug-in at home). Turns itself off when the session ends. |
| `input_select.ev_charging_session` | Current session: `idle`, `solar`, `night`, `boost`. Restart-safe state. |
| `input_number.ev_minimum_battery` | Night fallback when the battery is below this (default 30 %). |
| `input_number.ev_minimum_solar_forecast` | Night fallback when the coming day's Forecast.Solar estimate is below this (default 8 kWh). |
| `sensor.ev_peak_safe_charging_amps` | Template helper: highest amps that keep grid import under this month's peak demand (min 2.5 kW) minus 300 W. |

## Automations

- **Energy: EV smart charging** — session state machine.
  - Solar: start after 5 min of >1.2 kW export, stop after 10 min of >300 W import.
  - Night (22:00–07:00): only when battery or forecast is below the minimum; ends at 07:00 once the battery is above the minimum.
  - Boost: `ev_charge_full_now` on → 16 A, no sun/night rules. Turning it off returns to smart charging.
  - Plugged in at home with no need → native charging is paused.
  - Ends on unplug, `Complete`, car leaving home. Polling 60 s during a session, default after.
- **Energy: EV charging amps follow** — every minute in solar/night sessions: amps += (target − grid) / 230 W; down at once, up ≤3 A/min. Target −100 W (solar) or peak cap (night).
- **Energy: EV charging amps too high** — push (`notify.all`) when the car charges at home above `sensor.ev_peak_safe_charging_amps` for 3 min in an `idle` (native) or `boost` session, with a button to lower to the peak-safe amps or to pause. Max one push per 30 min.
- **Energy: EV charging amps too high actions** — handles `EV_LOWER_AMPS` / `EV_PAUSE_CHARGING`.
- **Energy: grid export too high** — skips its nag while smart charging can absorb the surplus.

`script.electric_vehicle_charging_set_amps_link_to_excess_solar` is no longer used: it assumes 3-phase and ignores house load.
