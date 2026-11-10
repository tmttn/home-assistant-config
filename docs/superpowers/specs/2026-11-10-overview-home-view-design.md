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

```text
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

## Declutter pass

Tom found the polished view still too busy. Same sections and layout, fewer and
calmer cards (84 → 66 cards, most remaining tiles smaller):

- View header: a greeting with inside, outside and solar figures; person, alarm
  and weather badges sit under it. The Tesla view badge went (the car section
  shows the battery). `dense_section_placement` fills row gaps.
- Energy: solar forecasts became heading badges; the cost table became one line
  (today, this month, last month).
- Home: vacation, guests and auto temp became toggle badges on the heading;
  the four collection dates are a 2×2 grid.
- Lights: 13 tiles instead of 21. Cozy and White moved to heading buttons. The
  bedroom, guest bedroom and outside groups list their members in more-info, so
  their sub-light tiles went; the living-room group is a Hue room without a
  member list, so its sub-lights stay. Automatic lights and terrace (the only
  member of outside) went.
- Climate: no inline setpoint bars; each tile shows current and target
  temperature, and tapping it opens the thermostat.
- Security: doors are four small tiles in one row, without last-changed text.
- Car: door lock became a heading badge; Amps shows only while charging.
- Vacuum: vacuum day and cleaned today became heading badges; the Appliances
  subheading went.

## Schedule and car pass

- Schedule: the alarm clock and the four collection-date tiles became one
  borderless list sorted by date ("Tomorrow 07:15 · Alarm", "Sat 14 Nov ·
  GFT, PMD"). The tiles cut the dates off and mixed two date formats. The
  amber "trash tomorrow" tile stays as the alert.
- Sleep mode is one row: the select sits inline and the duplicate "off" state
  is hidden.
- Car: the door-lock badge did not fit the heading (three badges need about
  250 px of the 204 available) and scrolled out of view. It is now a Doors
  tile next to Limit; tapping the tile or its icon opens the lock dialog, so
  unlocking is never a single click.
- "Vacuum & appliances" became "Appliances" so the heading fits beside its
  badges.

## Room-centric rebuild (supersedes the layouts above)

Tom's verdict on the passes above: a pile of buttons (lights, climate and
part of security), and an energy flow that took a third of the screen
although nobody asked for it. He wants usability: a clearer dashboard that
is easier to use, without losing information.

What 21 days of his own actions (logbook entries with a user context) show:
light zones per room dominate (dining table 44, middle 39, bedroom 38,
bathroom 27, kitchen 19, corner 19), then espresso 22, "everything off" 18,
heating Low 18 and going to sleep about 15. Room setpoints were changed by
hand 3 times; security, energy and the car were only looked at.

The Home view is therefore organised by room, not by device type:

```text
Ground floor        | First floor     | Home              | Security
 Living room 19.8°  |  Bedroom 15.8°  |  Wake/Sleep/      |  Alarm modes
  zones + Cozy/White|  Bathroom 17.7° |  Arrive/Leave     |  All doors closed
 Kitchen, Hall,     |  Guest room     |  Everything off   |  3 camera stills
 Storage, Outside   |  Marthe         |  Sleep, Heating   | Energy (compact)
                    |                 |  Schedule         |
                    |                 | Devices           |
```

- Each room is a subtitle heading with its current temperature (tap opens
  the thermostat) and a door badge that appears only while that door is
  open. Below it, one compact tile per light zone: name only, the icon
  colour shows on/off, tap toggles, hold opens brightness.
- Cozy and White sit on the living-room heading; Low/Mid/High on a
  Heating heading in Home; "Everything off" is a shortcut there too.
- Adaptive-lighting manual control (with its Reset button) appears in Home
  only while some light is under manual control.
- Security is one alarm tile, a one-line door summary and three stills.
- Energy is two one-row tiles (solar, grid with inline trend) and the cost
  line; the heading opens the Energy dashboard, which has the flow diagram.
- Devices: the car and vacuum tiles open subviews (`/lovelace/car`,
  `/lovelace/vacuum`) that hold everything the old sections had (charging,
  amps, limit, door lock; vacuum commands, map, maintenance). The washer
  stays inline.
- The header line reads inside/outside temperature, how many light zones
  are on, open doors and alarm state.

At 1728 px the whole view fits on one screen in four even columns; at
1280 px it falls back to two columns with the floors first.

## House-panel card (supersedes the room-centric tiles)

The room layout above was right in structure but still rendered as HA's
standard tiles: 25 identical grey light buttons, five of them called
"Lights", on/off hard to see. Built-in cards cannot render the room-card
design, so Tom chose a bespoke card over Mushroom with card-mod.

`www/house-panel/house-panel.js` defines three cards, no dependencies,
colours from the active theme plus one accent ("lamplight" amber):

- `custom:house-rooms-card`: one card per room, grouped by floor, in its
  own grid (4 columns, living room 2 wide, outside 3 wide; container queries
  drop to 3, 2 and 1 columns). A room with any light on is tinted amber.
  The room icon toggles the room's light group (or all its zones), the
  temperature is the large figure (tap opens the thermostat, "→ 17°" while
  heating up), light zones and the espresso machine are pills (tap toggles,
  long press opens more-info), Cozy/White are outlined scene pills. Rooms
  without lights show their heating state; an open door shows in red.
- `custom:house-actions-card`: the four routines and "Everything off",
  sleep mode as a segmented control, heating Low/Mid/High, mode toggles,
  and an adaptive-lighting manual-control notice with Reset only when
  something is under manual control.
- `custom:house-status-card`: quiet label/value rows for Security (alarm,
  doors), Energy (solar with forecast, grid import/export, cost today,
  this month, last month; title opens the Energy dashboard), Devices (car
  and vacuum open their subviews; washer with time since change and time
  left; water-tank warning only when empty) and Schedule (alarm and
  collection days, grouped by date).

Layout at 1728 px: rooms span three columns with Security, Energy and
Devices beneath them; Home, Schedule and the three camera stills fill the
fourth column. The whole house fits on one screen.

The card is served from `/local/house-panel/house-panel.js?v=<VERSION>`;
bump both after editing, because `/local/` is cached for 31 days.
