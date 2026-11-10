# Overview dashboard: Home view rebuild

Short design, 2026-11-10.

## Intent

The Overview dashboard ("Huis", `url_path: lovelace`) is Tom's control panel on a
laptop. The phone is covered by the separate Mobile dashboard. The Home view should
put every everyday control on one wide screen, fix what is broken today, and show
the parts of the house it currently ignores: solar, the Tesla ("Bizzylectric") and
security.

## Goals

- One view, laid out for a laptop (3–4 section columns), everything controllable
  without drilling into other pages.
- Fix broken or misleading cards:
  - power graph colours assume power is never negative; the P1 meter goes negative
    when exporting solar;
  - espresso cost row reads `sensor.espresso_machine_today_s_consumption`, which does
    not exist;
  - "Gas" graph plots the cumulative daily total, a ramp rather than usage;
  - bare `style:` keys that card-mod 4 ignores;
  - `schedule.alarm_clock_schedule` shown twice.
- Add solar, EV and security controls.

## Non-goals

- System and Automations views stay as they are.
- Mobile, Map and Degree Days dashboards are untouched.
- No new HA entities or helpers.

## Anti-goals

- Losing a control the current Home view has.
- Adding custom cards; this rebuild should reduce them.

## Constraints

- Storage-mode dashboard: edit through the HA API, never `.storage/`. The export
  automation (`shell_command.convert_lovelace`) refreshes `lovelace-ui.yaml`, which
  gets committed.
- HA 2026.11: tile features, heading badges, shortcut cards and template
  visibility conditions are all available.
- The Energy dashboard is fully configured (grid T1/T2 with export, gas, solar
  with forecast, water; espresso and Tesla as devices), so the built-in energy
  cards work on this dashboard.

## Approaches

- **A. Patch in place:** keep the Mushroom/stack-in-card layout, fix bugs, add
  sections in the same style. Smallest diff, but keeps the heavy Jinja, the stacked
  blocks and the custom-card upgrade risk.
- **B. Rebuild on built-in cards (picked):** heading cards with status badges, tile
  cards with inline features, built-in energy cards; custom cards only where nothing
  built-in fits. A bigger change and a different look, but sturdier and uses the
  laptop's width.
- **C. Split into Home / Energy / Security views:** tidy pages, but every check
  costs a tab click on a screen that has room for all of it. Dropped.

Tom picked B.

## Design

View-level badges: `person.tom`, `person.tanja`, `alarm_control_panel.bunderhome_alarm`,
solar power, grid power, EV battery, `weather.home`.

Sections, each starting with a `heading` card:

1. **Modes:** shortcut cards for Wake up, Go to sleep (`script.going_to_sleep`),
   Arrive (`script.arriving`) and Leave (`script.leaving`); toggle tiles for
   vacation, guest and automatic-temperature modes; sleep mode with
   `select-options`.
2. **Lights:** tiles with `light-brightness` for each room group (living, hall,
   bathroom, bedroom, guest bedroom, kitchen, toilet, outside/terrace) and the
   living-room sub-groups; Christmas tree and Hue plug switches; heading button
   badges for Cozy and White scenes and Reset adaptive lighting; a text line listing
   manually controlled lights, shown only when there are any.
3. **Climate:** a `target-temperature` tile per room (8); heading button badges
   for the low/moderate/high temperature scripts.
4. **Energy:** live tiles for grid (P1, negative = export), solar (SMA PV power)
   and EV charging, each with a trend graph; built-in `energy-distribution` for
   today; a markdown cost table (today / this month / last month × power, gas,
   fixed, total) built from the existing cost sensors.
5. **EV:** battery, charger switch, charging amps and charge limit
   (`numeric-input`), door lock, excess-solar charging script.
6. **Security:** alarm tile with `alarm-modes`; four door tiles; three camera
   snapshots.
7. **Vacuum & appliances:** vacuum tile with `vacuum-commands`; vacuum day and
   cleaned-today; water-shortage warning shown only when on; the vacuum map
   (custom `xiaomi-vacuum-map-card`, kept collapsible); washing machine and
   espresso machine tiles showing program phase / power and time since last change.
8. **Schedule:** alarm clock schedule, a trash-tomorrow tile shown only when there
   is a collection, and the four collection dates.

## Polish pass (after the first render)

The first build worked but looked flat. Sections in a sections view line up in
rows, so short sections next to long ones left large gaps, and 16 identical
grey light tiles formed a wall. Tom chose to keep the built-in tiles and fix the
composition. His laptop is 1728 px wide, which gives 4 section columns with the
sidebar open.

```
Row 1: Energy (column_span 2, amber tint) | Home | Lights
Row 2: Climate | Security | Bizzylectric | Vacuum & appliances
```

- Energy is the one emphasised section: two columns wide with a faint amber
  background. It holds grid and solar trends, today's and tomorrow's solar
  forecast, the energy flow and the cost table side by side. Solar and grid
  were removed from the view badges because Energy now shows them at the top.
- Home merges Modes and Schedule; vacation, guests and auto temp are vertical
  tiles three across.
- Lights are compact vertical tiles four across (tap toggles, hold opens the
  brightness dialog). The living-room brightness slider is gone because it
  rendered as an empty grey bar when the light was off. The Cozy and White
  scenes are tiles in the same grid.
- Shorter names so no label truncates at 4 columns.
- Vacuum battery is a heading badge; the separate espresso power tile is gone.
- At 3 columns (1440 px) the layout still reads: Energy and Home share row 1.

## Calls made without asking

- People map dropped from Home: the Map dashboard covers it.
- Per-appliance € cost rows dropped; espresso usage shows in the energy cards
  instead, which fixes the missing-sensor bug without a new sensor.
- Simple Vacuum Card (unmaintained since 2023) replaced by built-in tiles on the
  vacuum's maintenance sensors.

## Left to the builder

Card order within sections, `grid_options` sizes, icons, and which tiles get trend
graphs, as long as the layout reads well at laptop width.
