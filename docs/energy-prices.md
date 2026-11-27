# Energy prices

All-in prices (energy + network + levies + VAT) come from three Marketplace integrations by renaudallard, set up
in the UI on 2026-11-27. They read each supplier's published tariff card live, so no price is typed by hand.

| Integration | Entry | Notes |
| --- | --- | --- |
| `be_electricity_prices` | Frank Energie Variabel JN, Fluvius Limburg | Mono meter, keyless day-ahead (energy-charts), capacity peak from `sensor.p1_meter_peak_demand_current_month`, 3.0 kVA solar on the injection tariff, P1 T1/T2 registers. Signing rate typed from the October 2025 card: factor 1.113, base 0.01272 EUR/kWh, fee 27.96 EUR/yr. Contract start 2025-11-01 is an assumption. |
| `be_gas_prices` | Frank Energie Gas Variabel JN | Postcode 3740, `sensor.p1_meter_total_gas`, m³ → kWh on the Atrias value of GOS Fluvius - Hasselt. |
| `be_water_prices` | De Watergroep, Bilzen | 3 registered residents, `sensor.water_meter_water`. |

## Template sensors

The old tariff template helpers keep their entity IDs (Energy dashboard and statistics depend on them) but now
read the integrations. They find the integration's entity by suffix with `integration_entities()`, so a new
contract entry needs no template edit:

| Sensor | Source |
| --- | --- |
| `sensor.electricity_price_peak` / `_offpeak` | `*_current_price` (mono meter: same value) |
| `sensor.electricity_price_injection` | `*_injection_price` |
| `sensor.gas_price` | `*_current_price_per_m3` |
| `sensor.daily_power_cost` | offtake × price − export × injection + `*_capacity_cost` ÷ days in month |
| `sensor.monthly_power_cost` | `*_current_month_cost` − its `standing_charges_mtd_eur` attribute |
| `sensor.daily_energy_fixed_cost` (+ monthly, last period) | gas `*_fixed_costs_per_year` + electricity `standing_charges_ytd_eur` annualised |

The Energy dashboard water source is priced with `sensor.de_watergroep_all_in_basis_rate` (basis block; the comfort
block starts above 30 + 30 × residents m³ a year).

The hand-typed `input_number.tariff_electricity`, `_injection`, `_gas` and `_fixed_energy_costs` were deleted on
2026-11-27. `input_number.tariff_electricity_capacity` still feeds `sensor.electricity_capacity_tariff`, which
`sensor.monthly_power_cost_last_period` uses.

## Contract changes

EnergyVision contract signed 2026-11-17:

- Electricity: Goedkope Stroom 5 jaar Vast, 2027-01-01 to 2032-01-01, then Goedkope Groene Stroom 1.800 kWh vast.
- Gas: Goedkope Stroom 1 jaar vast, 2027-01-01 to 2028-01-01, then Goedkope Groene stroom - gas (monthly ZTP).

A start on 1 January is not a mid-year switch (the integrations' "Record a supplier switch" only takes 2 January to
today), so each entry's contract is edited instead. One-shot Claude scheduled tasks do this:
`energyvision-switch-2027` (2027-01-01) and `energyvision-gas-variable-2028` (2028-01-01).

## Setup gotchas

- A config-flow submit can time out while the first refresh fetches the law from Justel; the entry is still created
  in `setup_error`. Reload it (`homeassistant.reload_config_entry`) rather than adding it again.
- The MCP flow output drops select labels: Atrias station names come from `api.atrias.be` (GCV file), De Watergroep
  commune GUIDs from the `<option>` list on dewatergroep.be/nl-be/drinkwater/tarieven.
