# Overview Home View Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `views[0]` ("Home") of the Overview dashboard with a laptop control panel built on built-in cards, per the design.

**Architecture:** A scratchpad Python script builds the new view as JSON. A checker script validates it against live HA (every entity exists, every tile feature fits its entity, only allowed card types). The view is written through `ha_config_set_dashboard` with a JSON Patch on `/views/0`, then rendered in the browser to check it. `lovelace-ui.yaml` is regenerated locally in `json2yaml.py`'s format so the repo matches live.

**Tech Stack:** HA 2026.11 Lovelace (sections view, tile/heading/shortcut/markdown/energy cards), ha-mcp tools, Python 3 + PyYAML.

**Spec:** `docs/superpowers/specs/2026-11-10-overview-home-view-design.md`

## Global Constraints

- Only `views[0]` changes; `views[1]` (System) and `views[2]` (Automations), `decluttering_templates`, `background` and `title` stay byte-identical.
- Allowed custom card types: `custom:xiaomi-vacuum-map-card`, `custom:collapsable-cards`. Everything else built in.
- No bare `style:` keys; styling goes under `card_mod:`.
- Actions use `perform-action` / `perform_action`, never `call-service`.
- Keep `path: default_view`, `type: sections`, `max_columns: 4`, `icon: mdi:home`, `title: Home`.
- No new HA entities or helpers.

## Review Focus

1. A tile feature on an entity that cannot use it (e.g. `light-brightness` on an on/off-only light such as `light.hue_plug`) renders an empty or broken control. Expect: a feature only where the entity supports it.
2. The "manual control" markdown when every adaptive-lighting `manual_control` attribute is `None` or `[]`. Expect: the card hidden, no template error.
3. Negative P1 power. Expect: the label makes clear that minus means export.
4. A narrow laptop window (split screen, ~800px). Expect: sections collapse to 1–2 columns with nothing squeezed unreadable.
5. Washer off (all program sensors `unknown`). Expect: the tile shows "Off" plus time since last change, not "unknown".

Items 1 and 2 are pinned by checks in Task 2; items 3–5 by the render check in Task 4.

---

### Task 1: Snapshot current config

**Files:**
- Create: `<scratchpad>/overview-before.json` (full dashboard config + `config_hash`)

- [ ] **Step 1:** `ha_config_get_dashboard(url_path="lovelace", force_reload=True)` and save the full `config` to `overview-before.json`. This is the rollback: restoring it is a `config=` write of that file.
- [ ] **Step 2:** Verify: the file has 3 views, and `views[0].path == "default_view"`.

### Task 2: Build and check the new Home view

**Files:**
- Create: `<scratchpad>/build_home_view.py`: writes `<scratchpad>/home-view.json` (one view object)
- Create: `<scratchpad>/check_view.py`: reads `home-view.json` plus `<scratchpad>/states.json` (live states fetched via `ha_get_state`) and exits non-zero on failure

**Interfaces:**
- Produces: `home-view.json`, the exact object written to `/views/0` in Task 3.

- [ ] **Step 1: Write `check_view.py` checks:**
  - `all_entities_exist`: every `entity`, `entity_id`, `entities[]` and badge entity in the view is present in `states.json`.
  - `card_types_allowed`: every `type` starting with `custom:` is in the allowed list.
  - `no_bare_style`: no dict has a `style` key unless its parent key is `card_mod`.
  - `no_call_service`: no `action == "call-service"`, and no `service` / `service_data` keys.
  - `light_brightness_supported`: every tile with a `light-brightness` feature targets a light whose `supported_color_modes` is not just `["onoff"]`.
  - `climate_target_temp_supported`: every tile with `target-temperature` targets a `climate.*` entity.
  - `manual_control_template_safe`: the adaptive-lighting markdown's template uses `or []` on every `state_attr`.
- [ ] **Step 2:** Run against a stub `home-view.json` containing `light.hue_plug` with `light-brightness`. Expect FAIL on `light_brightness_supported`.
- [ ] **Step 3:** Write `build_home_view.py` with the 8 sections and view badges from the design. Section-level choices fixed here:
  - Modes: four `shortcut` cards (`grid_options.columns: 3`); the Wake up action is `input_select.select_option` with `option: "off"` on `input_select.sleep_mode`.
  - Lights: room-group tiles at `columns: 6`; living sub-group tiles at `columns: 4`; heading badges `type: button` for `script.cozy_lights_living_room`, `script.white_lights_living_room`, `script.reset_adaptive_lighting`.
  - Climate: 8 tiles at `columns: 6`, `features: [{type: target-temperature}]`; heading badges for `script.set_low_temperature`, `script.set_moderate_temperature`, `script.set_high_temperature`.
  - Energy: tiles for `sensor.p1_meter_active_power` (name `Grid (− = export)`), `sensor.sb3_0_1av_41_570_pv_power` and `sensor.bizzylectric_charger_power`, with `trend-graph`; `energy-distribution`; a markdown cost table over the existing `daily_*`, `monthly_*` and `*_last_period` cost sensors.
  - Vacuum map: `custom:collapsable-cards` wrapping `custom:xiaomi-vacuum-map-card`, with its existing `map_modes` / `predefined_selections` copied verbatim from `overview-before.json` and the old `style:` dropped.
- [ ] **Step 4:** Fetch states for every entity in the view into `states.json`, then run `python3 check_view.py`. Expect exit 0, all checks PASS.

### Task 3: Write the view to HA

- [ ] **Step 1:** `ha_config_set_dashboard(url_path="lovelace", config_hash=<from Task 1>, patch=[{"op": "replace", "path": "/views/0", "value": <home-view.json>}])`.
- [ ] **Step 2:** Read back with `force_reload=True`. Expect `views[0]` == `home-view.json`, and `views[1:]` == `overview-before.json` `views[1:]`.

### Task 4: Render check

- [ ] **Step 1:** Open the Overview Home view in the browser at 1440×900. Screenshot. Expect 3–4 section columns and no red "Configuration error" or "Custom element doesn't exist" cards.
- [ ] **Step 2:** Resize to 800×900 and screenshot. Expect 1–2 columns and readable tiles (Review Focus 4).
- [ ] **Step 3:** Check the grid tile label and the washer tile state text (Review Focus 3 and 5). Expect browser console errors: none from dashboard cards.
- [ ] **Step 4:** If the browser can't reach HA, fall back to `ha_config_get_dashboard(include_screenshot=True)`. If both fail, say so in the PR.

### Task 5: Regenerate export and open the PR

**Files:**
- Modify: `lovelace-ui.yaml` (regenerated: the existing ASCII header, then `yaml.dump(config, allow_unicode=True)` after `---`, the same as `utils/json2yaml.py`)
- Add: design doc and this plan

- [ ] **Step 1:** Regenerate `lovelace-ui.yaml` from the read-back config. Verify: `git diff --stat` touches only the Home view region, and `yamllint -c .github/yamllint-config.yml lovelace-ui.yaml` passes.
- [ ] **Step 2:** Commit (`feat(lovelace): rebuild Overview Home view as a laptop control panel`), push, and open a PR against `main`.
