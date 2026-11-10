/*
 * house-panel: bespoke cards for the Overview dashboard.
 *
 *   custom:house-rooms-card    rooms with temperature, light zones and a warm glow when lit
 *   custom:house-actions-card  home actions, sleep mode, heating schemes, mode toggles
 *   custom:house-status-card   quiet label/value rows (security, energy, devices, schedule)
 *
 * No dependencies. Colours follow the active HA theme; one accent ("lamplight")
 * marks lights that are on.
 *
 * Served as /local/house-panel/house-panel.js and registered as a dashboard
 * resource with ?v=<VERSION>. /local/ is cached for 31 days: after editing this
 * file, bump VERSION and the ?v= on the resource URL, or clients keep the old copy.
 */

const VERSION = "1.0.0";

const STYLE = `
  :host {
    --hp-lamp: #f0b453;
    --hp-heat: #e8795a;
    --hp-alert: var(--error-color, #db4437);
    --hp-surface: var(--ha-card-background, var(--card-background-color, #1c1c1c));
    --hp-text: var(--primary-text-color);
    --hp-muted: var(--secondary-text-color);
    --hp-line: var(--divider-color, rgba(127, 127, 127, 0.2));
    --hp-radius: var(--ha-card-border-radius, 12px);
    --hp-quiet: color-mix(in srgb, var(--hp-text) 6%, transparent);
    --hp-quiet-hover: color-mix(in srgb, var(--hp-text) 10%, transparent);
    display: block;
    font-family: var(--ha-font-family-body, inherit);
    color: var(--hp-text);
    -webkit-tap-highlight-color: transparent;
  }
  * { box-sizing: border-box; }
  button {
    font: inherit; color: inherit; border: 0; background: none; padding: 0; margin: 0;
    cursor: pointer; text-align: left;
  }
  button:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
  ha-icon { --mdc-icon-size: 20px; display: inline-flex; }
  .num { font-variant-numeric: tabular-nums; }

  .card {
    background: var(--hp-surface);
    border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--hp-line));
    border-radius: var(--hp-radius);
  }

  /* pills: light zones, scenes, toggles, segments */
  .pills { display: flex; flex-wrap: wrap; gap: 6px; }
  .pill {
    display: inline-flex; align-items: center; gap: 6px;
    height: 32px; padding: 0 12px 0 9px; border-radius: 16px;
    background: var(--hp-quiet); color: var(--hp-muted);
    font-size: 13px; font-weight: 500; white-space: nowrap;
    transition: background-color 160ms ease, color 160ms ease;
  }
  .pill ha-icon { --mdc-icon-size: 17px; }
  .pill:hover { background: var(--hp-quiet-hover); }
  .pill.on {
    background: color-mix(in srgb, var(--hp-lamp) 22%, var(--hp-surface));
    color: color-mix(in srgb, var(--hp-lamp) 50%, var(--hp-text));
  }
  .pill.on ha-icon { color: var(--hp-lamp); }
  .pill.scene { background: transparent; box-shadow: inset 0 0 0 1px var(--hp-line); }
  .pill.scene:hover { background: var(--hp-quiet); }
  .unavailable { opacity: 0.45; }
`;

/* ---------- helpers ---------- */

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[c]));

const isOn = (st) => !!st && ["on", "open", "unlocked", "heat", "home"].includes(st.state);
const bad = (st) => !st || ["unavailable", "unknown"].includes(st.state);

function fmtNumber(hass, value, decimals) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  const lang = hass?.locale?.language || hass?.language || "en";
  return new Intl.NumberFormat(lang, {
    minimumFractionDigits: decimals ?? 0, maximumFractionDigits: decimals ?? 0,
  }).format(n);
}

function fmtState(hass, entityId, opts = {}) {
  const st = hass.states[entityId];
  if (!st) return "—";
  const raw = opts.attribute ? st.attributes[opts.attribute] : st.state;
  if (raw === undefined || raw === null || raw === "unknown" || raw === "unavailable") return "—";
  if (opts.decimals !== undefined && Number.isFinite(Number(raw))) {
    const unit = opts.unit ?? (opts.attribute ? "" : st.attributes.unit_of_measurement || "");
    return `${fmtNumber(hass, raw, opts.decimals)}${unit ? (unit === "%" ? "" : " ") + unit : ""}`;
  }
  if (!opts.attribute && hass.formatEntityState) return hass.formatEntityState(st);
  if (opts.attribute && hass.formatEntityAttributeValue) {
    return hass.formatEntityAttributeValue(st, opts.attribute);
  }
  return String(raw);
}

function relTime(hass, iso) {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "";
  const secs = Math.round((then - Date.now()) / 1000);
  const lang = hass?.locale?.language || "en";
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  const abs = Math.abs(secs);
  if (abs < 60) return rtf.format(secs, "second");
  if (abs < 3600) return rtf.format(Math.round(secs / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(secs / 3600), "hour");
  return rtf.format(Math.round(secs / 86400), "day");
}

function dayLabel(date, hass) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const d = new Date(date); d.setHours(0, 0, 0, 0);
  const diff = Math.round((d - today) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  const lang = hass?.locale?.language || "en";
  return new Intl.DateTimeFormat(lang, { weekday: "short", day: "numeric", month: "short" }).format(date);
}

/* Base: watched-entity diffing, actions, long-press. */
class HousePanelBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hold = null;
    this._held = false;
    this.shadowRoot.addEventListener("click", (ev) => this._onClick(ev));
    this.shadowRoot.addEventListener("pointerdown", (ev) => this._onDown(ev));
    ["pointerup", "pointercancel", "pointerleave"].forEach((t) =>
      this.shadowRoot.addEventListener(t, () => clearTimeout(this._hold)));
    this.shadowRoot.addEventListener("contextmenu", (ev) => {
      const el = ev.composedPath().find((n) => n.dataset?.hold);
      if (el) { ev.preventDefault(); this._moreInfo(el.dataset.hold); }
    });
  }

  set hass(hass) {
    const prev = this._hass;
    this._hass = hass;
    if (!this._config) return;
    if (!prev || this._watched().some((id) => prev.states[id] !== hass.states[id])) this._render();
  }

  get hass() { return this._hass; }

  _watched() { return []; }

  getCardSize() { return 4; }

  _onDown(ev) {
    const el = ev.composedPath().find((n) => n.dataset?.hold);
    this._held = false;
    clearTimeout(this._hold);
    if (!el) return;
    this._hold = setTimeout(() => {
      this._held = true;
      this._moreInfo(el.dataset.hold);
    }, 500);
  }

  _onClick(ev) {
    if (this._held) { this._held = false; return; }
    const el = ev.composedPath().find((n) => n.dataset?.act);
    if (!el) return;
    const d = el.dataset;
    switch (d.act) {
      case "toggle": this._hass.callService("homeassistant", "toggle", { entity_id: d.entity }); break;
      case "all": {
        const ids = d.entities.split(",");
        const anyOn = ids.some((id) => isOn(this._hass.states[id]));
        this._hass.callService("homeassistant", anyOn ? "turn_off" : "turn_on", { entity_id: ids });
        break;
      }
      case "more-info": this._moreInfo(d.entity); break;
      case "navigate": this._navigate(d.path); break;
      case "run": {
        const [domain, service] = d.service.split(".");
        const data = d.data ? JSON.parse(d.data) : {};
        this._hass.callService(domain, service, data);
        break;
      }
      case "select":
        this._hass.callService("input_select", "select_option", { entity_id: d.entity, option: d.option });
        break;
      default: break;
    }
  }

  _moreInfo(entityId) {
    this.dispatchEvent(new CustomEvent("hass-more-info", {
      detail: { entityId }, bubbles: true, composed: true,
    }));
  }

  _navigate(path) {
    if (path.startsWith("/energy") || path.startsWith("/lovelace") || path.startsWith("/")) {
      history.pushState(null, "", path);
      window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
    }
  }
}

/* ---------- rooms ---------- */

const ROOMS_STYLE = `
  .grid {
    container-type: inline-size;
    display: grid; gap: 10px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .floor {
    grid-column: 1 / -1; margin: 6px 2px -2px; font-size: 13px; color: var(--hp-muted);
  }
  .floor:first-child { margin-top: 0; }
  .room {
    display: flex; flex-direction: column; gap: 12px; padding: 14px 14px 14px 14px; min-height: 112px;
    transition: background-color 200ms ease, border-color 200ms ease;
  }
  .room.span2 { grid-column: span 2; }
  .room.span3 { grid-column: span 3; }
  .room.lit {
    background: color-mix(in srgb, var(--hp-lamp) 9%, var(--hp-surface));
    border-color: color-mix(in srgb, var(--hp-lamp) 38%, transparent);
  }
  .head { display: flex; align-items: flex-start; gap: 12px; }
  .main {
    flex: none; width: 40px; height: 40px; border-radius: 50%;
    display: grid; place-items: center; background: var(--hp-quiet); color: var(--hp-muted);
    transition: background-color 160ms ease, color 160ms ease;
  }
  .main:hover { background: var(--hp-quiet-hover); }
  .main.static { cursor: default; background: transparent; box-shadow: inset 0 0 0 1px var(--hp-line); }
  .main.on { background: color-mix(in srgb, var(--hp-lamp) 26%, var(--hp-surface)); color: var(--hp-lamp); }
  .who { flex: 1; min-width: 0; padding-top: 2px; }
  .name { font-size: 15px; font-weight: 500; line-height: 1.25; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .meta { font-size: 12.5px; color: var(--hp-muted); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .meta .alert { color: var(--hp-alert); font-weight: 500; }
  .temp { flex: none; text-align: right; line-height: 1; }
  .temp .now { font-size: 28px; font-weight: 300; letter-spacing: -0.5px; }
  .temp .now small { font-size: 15px; font-weight: 400; vertical-align: top; margin-left: 1px; color: var(--hp-muted); }
  .temp .goal { display: block; font-size: 12px; margin-top: 5px; color: var(--hp-heat); }
  .temp.off .now { color: var(--hp-muted); }
  .sep { width: 1px; height: 20px; background: var(--hp-line); align-self: center; margin: 0 2px; }

  @container (max-width: 860px) {
    .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .room.span3 { grid-column: span 3; }
  }
  @container (max-width: 640px) {
    .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .room.span3 { grid-column: span 2; }
  }
  @container (max-width: 400px) {
    .grid { grid-template-columns: minmax(0, 1fr); }
    .room.span2, .room.span3 { grid-column: auto; }
  }
`;

class HouseRoomsCard extends HousePanelBase {
  setConfig(config) {
    if (!Array.isArray(config?.floors)) throw new Error("house-rooms-card: `floors` list is required");
    this._config = config;
    if (this._hass) this._render();
  }

  getGridOptions() { return { columns: "full", rows: "auto" }; }

  getCardSize() { return 8; }

  _watched() {
    const ids = [];
    for (const f of this._config.floors) {
      for (const r of f.rooms || []) {
        if (r.climate) ids.push(r.climate);
        if (r.lights) ids.push(r.lights);
        [].concat(r.door || []).forEach((d) => ids.push(d));
        (r.zones || []).forEach((z) => ids.push(z.entity));
      }
    }
    return ids;
  }

  _room(r) {
    const h = this._hass;
    const zones = r.zones || [];
    const lightZones = zones.filter((z) => z.kind !== "device");
    const groupOn = r.lights ? isOn(h.states[r.lights]) : false;
    const zonesOn = lightZones.filter((z) => isOn(h.states[z.entity])).length;
    const lit = groupOn || zonesOn > 0;
    const doors = [].concat(r.door || []).filter((d) => isOn(h.states[d]));

    // main control: the room's light group, or all light zones together
    let main;
    const icon = `<ha-icon icon="${esc(r.icon || "mdi:lightbulb-outline")}"></ha-icon>`;
    if (r.lights) {
      main = `<button class="main ${groupOn ? "on" : ""}" data-act="toggle" data-entity="${esc(r.lights)}"
        data-hold="${esc(r.lights)}" aria-label="${esc(r.name)} lights">${icon}</button>`;
    } else if (lightZones.length) {
      main = `<button class="main ${zonesOn ? "on" : ""}" data-act="all"
        data-entities="${esc(lightZones.map((z) => z.entity).join(","))}" aria-label="${esc(r.name)} lights">${icon}</button>`;
    } else {
      main = `<span class="main static" aria-hidden="true">${icon}</span>`;
    }

    // status line
    const bits = [];
    if (doors.length) bits.push(`<span class="alert">${doors.length > 1 ? "Doors" : "Door"} open</span>`);
    if (lightZones.length > 1) bits.push(zonesOn ? `${zonesOn} of ${lightZones.length} on` : "Lights off");
    else if (r.lights || lightZones.length) bits.push(lit ? "Lights on" : "Lights off");
    else if (r.climate && h.states[r.climate]) bits.push(h.states[r.climate].state === "off" ? "Heating off" : "Heating on");
    (r.notes || []).forEach((n) => { if (isOn(h.states[n.entity])) bits.push(esc(n.text)); });

    // temperature
    let temp = "";
    const cl = r.climate && h.states[r.climate];
    if (cl && !bad(cl)) {
      const cur = Number(cl.attributes.current_temperature);
      const goal = Number(cl.attributes.temperature);
      const heating = cl.state === "heat" && Number.isFinite(goal) && goal - cur >= 0.3;
      temp = `<button class="temp ${cl.state === "off" ? "off" : ""}" data-act="more-info" data-entity="${esc(r.climate)}"
          aria-label="${esc(r.name)} thermostat">
        <span class="now num">${Number.isFinite(cur) ? fmtNumber(h, cur, 1) : "—"}<small>°</small></span>
        ${heating ? `<span class="goal num" title="Heating to ${fmtNumber(h, goal, goal % 1 ? 1 : 0)}°">→ ${fmtNumber(h, goal, goal % 1 ? 1 : 0)}°</span>` : ""}
      </button>`;
    } else if (r.temperature) {
      const st = h.states[r.temperature.entity];
      const v = st && (r.temperature.attribute ? st.attributes[r.temperature.attribute] : st.state);
      temp = `<button class="temp" data-act="more-info" data-entity="${esc(r.temperature.entity)}">
        <span class="now num">${v !== undefined && v !== null ? fmtNumber(h, v, 0) : "—"}<small>°</small></span></button>`;
    }

    // pills: zones, then scenes
    const pills = zones.map((z) => {
      const st = h.states[z.entity];
      const on = isOn(st);
      return `<button class="pill ${on ? "on" : ""} ${bad(st) ? "unavailable" : ""}" data-act="toggle"
          data-entity="${esc(z.entity)}" data-hold="${esc(z.entity)}" aria-pressed="${on}">
        <ha-icon icon="${esc(z.icon || "mdi:lightbulb-outline")}"></ha-icon>${esc(z.name)}</button>`;
    });
    const scenes = (r.scenes || []).map((s) => `<button class="pill scene" data-act="run"
        data-service="script.turn_on" data-data='${esc(JSON.stringify({ entity_id: s.script }))}'>
        <ha-icon icon="${esc(s.icon || "mdi:palette-outline")}"></ha-icon>${esc(s.name)}</button>`);
    const pillRow = pills.length || scenes.length
      ? `<div class="pills">${pills.join("")}${pills.length && scenes.length ? '<span class="sep"></span>' : ""}${scenes.join("")}</div>`
      : "";

    return `<section class="card room ${lit ? "lit" : ""} ${r.span ? `span${r.span}` : ""}">
      <div class="head">${main}
        <div class="who"><div class="name">${esc(r.name)}</div><div class="meta">${bits.join(" · ")}</div></div>
        ${temp}
      </div>${pillRow}</section>`;
  }

  _render() {
    if (!this._hass) return;
    const body = this._config.floors.map((f) =>
      `${f.name ? `<div class="floor">${esc(f.name)}</div>` : ""}${(f.rooms || []).map((r) => this._room(r)).join("")}`).join("");
    this.shadowRoot.innerHTML = `<style>${STYLE}${ROOMS_STYLE}</style><div class="grid">${body}</div>`;
  }
}

/* ---------- actions ---------- */

const ACTIONS_STYLE = `
  .card { padding: 14px; display: flex; flex-direction: column; gap: 14px; }
  .title { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 500; }
  .title ha-icon { color: var(--hp-muted); --mdc-icon-size: 18px; }
  .buttons { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
  .btn {
    display: flex; align-items: center; gap: 10px; height: 44px; padding: 0 12px;
    border-radius: 10px; background: var(--hp-quiet); font-size: 13.5px; font-weight: 500;
  }
  .btn:hover { background: var(--hp-quiet-hover); }
  .btn.wide { grid-column: 1 / -1; }
  .row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .label { font-size: 13px; color: var(--hp-muted); flex: none; }
  .stack { display: flex; flex-direction: column; gap: 8px; }
  .seg { display: inline-flex; padding: 3px; gap: 2px; border-radius: 18px; background: var(--hp-quiet); }
  .seg button { height: 28px; padding: 0 12px; border-radius: 14px; font-size: 13px; color: var(--hp-muted); }
  .seg button:hover { color: var(--hp-text); }
  .seg button.sel { background: var(--hp-surface); color: var(--hp-text); font-weight: 500;
    box-shadow: 0 0 0 1px var(--hp-line); }
  .notice { font-size: 12.5px; color: var(--hp-muted); display: flex; gap: 8px; align-items: baseline; }
  .notice b { color: var(--hp-text); font-weight: 500; }
  .link { color: var(--primary-color); font-size: 12.5px; font-weight: 500; flex: none; }
`;

class HouseActionsCard extends HousePanelBase {
  setConfig(config) {
    this._config = config || {};
    if (this._hass) this._render();
  }

  getGridOptions() { return { columns: 12, rows: "auto" }; }

  _watched() {
    const c = this._config;
    return [
      ...(c.selects || []).map((s) => s.entity),
      ...(c.toggles || []).map((t) => t.entity),
      ...((c.manual && c.manual.switches) || []),
    ];
  }

  _button(b, wide) {
    const data = { ...(b.data || {}) };
    if (b.target) data.entity_id = b.target;
    return `<button class="btn ${wide ? "wide" : ""}" data-act="run" data-service="${esc(b.service)}"
        data-data='${esc(JSON.stringify(data))}'>
      <ha-icon icon="${esc(b.icon)}" style="color:${esc(b.color || "var(--hp-muted)")}"></ha-icon>${esc(b.name)}</button>`;
  }

  _render() {
    if (!this._hass) return;
    const h = this._hass;
    const c = this._config;
    const parts = [];
    parts.push(`<div class="title"><ha-icon icon="${esc(c.icon || "mdi:home-outline")}"></ha-icon>${esc(c.title || "Home")}</div>`);
    const btns = (c.buttons || []).map((b) => this._button(b, false)).join("")
      + (c.wide || []).map((b) => this._button(b, true)).join("");
    if (btns) parts.push(`<div class="buttons">${btns}</div>`);

    for (const s of c.selects || []) {
      const st = h.states[s.entity];
      const opts = (s.options || (st?.attributes.options || []).map((o) => ({ option: o, name: o })));
      parts.push(`<div class="row"><span class="label">${esc(s.name)}</span><div class="seg" role="radiogroup">${opts.map((o) =>
        `<button role="radio" aria-checked="${st?.state === o.option}" class="${st?.state === o.option ? "sel" : ""}"
          data-act="select" data-entity="${esc(s.entity)}" data-option="${esc(o.option)}">${esc(o.name)}</button>`).join("")}</div></div>`);
    }

    for (const g of c.groups || []) {
      parts.push(`<div class="${g.stack ? "stack" : "row"}"><span class="label">${esc(g.name)}</span><div class="pills">${(g.items || []).map((i) =>
        `<button class="pill scene" data-act="run" data-service="${esc(i.service)}"
          data-data='${esc(JSON.stringify(i.data || {}))}'>${i.icon ? `<ha-icon icon="${esc(i.icon)}"></ha-icon>` : ""}${esc(i.name)}</button>`).join("")}</div></div>`);
    }

    if ((c.toggles || []).length) {
      parts.push(`<div class="stack"><span class="label">${esc(c.toggles_name || "Modes")}</span><div class="pills">${c.toggles.map((t) => {
        const on = isOn(h.states[t.entity]);
        return `<button class="pill ${on ? "on" : ""}" data-act="toggle" data-entity="${esc(t.entity)}"
          data-hold="${esc(t.entity)}" aria-pressed="${on}"><ha-icon icon="${esc(t.icon)}"></ha-icon>${esc(t.name)}</button>`;
      }).join("")}</div></div>`);
    }

    const m = c.manual;
    if (m) {
      const names = (m.switches || []).flatMap((id) => h.states[id]?.attributes.manual_control || []);
      if (names.length) {
        const pretty = names.map((id) => h.states[id]?.attributes.friendly_name || id);
        parts.push(`<div class="row"><span class="notice"><span>Manual:</span><b>${esc(pretty.join(", "))}</b></span>
          <button class="link" data-act="run" data-service="script.turn_on"
            data-data='${esc(JSON.stringify({ entity_id: m.reset }))}'>Reset</button></div>`);
      }
    }

    this.shadowRoot.innerHTML = `<style>${STYLE}${ACTIONS_STYLE}</style><div class="card">${parts.join("")}</div>`;
  }
}

/* ---------- status ---------- */

const STATUS_STYLE = `
  .card { padding: 12px 14px 8px; }
  .title { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 500; margin-bottom: 4px; width: 100%; }
  .title ha-icon { color: var(--hp-muted); --mdc-icon-size: 18px; }
  .title .chev { margin-left: auto; color: var(--hp-muted); --mdc-icon-size: 18px; }
  .rows { display: flex; flex-direction: column; }
  .r {
    display: flex; align-items: baseline; justify-content: space-between; gap: 12px; width: 100%;
    padding: 8px 0; border-top: 1px solid var(--hp-line); font-size: 13.5px;
  }
  .r:first-child { border-top: 0; }
  .r .k { color: var(--hp-muted); flex: none; }
  .r .v { text-align: right; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .r .v small { color: var(--hp-muted); font-size: 12.5px; }
  .r.alert .v { color: var(--hp-alert); font-weight: 500; }
  .r.good .v { color: var(--hp-muted); }
  button.r:hover .v { color: var(--primary-color); }
`;

class HouseStatusCard extends HousePanelBase {
  setConfig(config) {
    if (!Array.isArray(config?.rows)) throw new Error("house-status-card: `rows` list is required");
    this._config = config;
    if (this._hass) this._render();
  }

  getGridOptions() { return { columns: 12, rows: "auto" }; }

  _watched() {
    const ids = [];
    for (const r of this._config.rows) {
      ["entity", "secondary", "when_on", "alarm"].forEach((k) => r[k] && ids.push(r[k]));
      (r.entities || []).forEach((e) => ids.push(Array.isArray(e) ? e[0] : e));
      (r.bins || []).forEach((b) => ids.push(b[1]));
    }
    return ids;
  }

  _row(r) {
    const h = this._hass;
    let value = "";
    let cls = "";
    switch (r.type || "entity") {
      case "doors": {
        const open = (r.entities || []).filter(([id]) => isOn(h.states[id])).map(([, n]) => n);
        value = open.length ? `${esc(open.join(", "))} open` : "All closed";
        cls = open.length ? "alert" : "good";
        break;
      }
      case "power": {
        const w = Number(h.states[r.entity]?.state);
        if (!Number.isFinite(w)) { value = "—"; break; }
        const kw = Math.abs(w) >= 1000;
        const amount = kw ? `${fmtNumber(h, Math.abs(w) / 1000, 1)} kW` : `${fmtNumber(h, Math.abs(w), 0)} W`;
        value = w < 0 ? `exporting <span class="num">${amount}</span>` : `importing <span class="num">${amount}</span>`;
        break;
      }
      case "sum": {
        const vals = (r.entities || []).map((id) => Number(h.states[id]?.state));
        value = vals.every(Number.isFinite)
          ? `<span class="num">${esc(r.prefix || "")}${fmtNumber(h, vals.reduce((a, b) => a + b, 0), r.decimals ?? 2)}</span>`
          : "—";
        break;
      }
      case "schedule": return this._schedule(r);
      default: {
        const st = h.states[r.entity];
        if (r.only_when_on && !isOn(st)) return "";
        value =`<span class="num">${esc(fmtState(h, r.entity, r))}</span>`;
        if (r.secondary) {
          value += ` <small>· ${esc(fmtState(h, r.secondary, { decimals: r.secondary_decimals }))}${esc(r.secondary_suffix || "")}</small>`;
        }
        if (r.since && st) value += ` <small>· ${esc(relTime(h, st.last_changed))}</small>`;
        if (r.when_on && isOn(st)) value += ` <small>· ${esc(fmtState(h, r.when_on))} left</small>`;
        if (r.alert_when_on && isOn(st)) cls = "alert";
      }
    }
    const tag = r.navigate || r.entity ? "button" : "div";
    const act = r.navigate
      ? `data-act="navigate" data-path="${esc(r.navigate)}"`
      : r.entity ? `data-act="more-info" data-entity="${esc(r.entity)}"` : "";
    return `<${tag} class="r ${cls}" ${act}><span class="k">${esc(r.name)}</span><span class="v">${value}</span></${tag}>`;
  }

  _schedule(r) {
    const h = this._hass;
    const items = [];
    if (r.alarm) {
      const st = h.states[r.alarm];
      const next = st?.attributes.next_event;
      if (st?.state === "on") items.push({ sort: 0, k: "Now", v: r.alarm_name || "Alarm" });
      else if (next) {
        const t = new Date(next);
        const time = new Intl.DateTimeFormat(h?.locale?.language || "en", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(t);
        items.push({ sort: t.getTime(), k: `${dayLabel(t, h)} ${time}`, v: r.alarm_name || "Alarm" });
      }
    }
    const byDay = new Map();
    for (const [name, id] of r.bins || []) {
      const sd = String(h.states[id]?.attributes.Sort_date || "");
      if (sd.length !== 8) continue;
      const t = new Date(+sd.slice(0, 4), +sd.slice(4, 6) - 1, +sd.slice(6, 8));
      if (!byDay.has(sd)) byDay.set(sd, { t, names: [] });
      byDay.get(sd).names.push(name);
    }
    for (const { t, names } of byDay.values()) {
      items.push({ sort: t.getTime(), k: dayLabel(t, h), v: names.join(", ") });
    }
    items.sort((a, b) => a.sort - b.sort);
    return items.slice(0, r.limit || 5).map((i) =>
      `<div class="r"><span class="k num">${esc(i.k)}</span><span class="v">${esc(i.v)}</span></div>`).join("");
  }

  _render() {
    if (!this._hass) return;
    const c = this._config;
    const titleInner = `<ha-icon icon="${esc(c.icon || "mdi:information-outline")}"></ha-icon>${esc(c.title || "")}${
      c.navigate ? '<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>' : ""}`;
    const title = c.title
      ? (c.navigate
        ? `<button class="title" data-act="navigate" data-path="${esc(c.navigate)}">${titleInner}</button>`
        : `<div class="title">${titleInner}</div>`)
      : "";
    this.shadowRoot.innerHTML = `<style>${STYLE}${STATUS_STYLE}</style>
      <div class="card">${title}<div class="rows">${c.rows.map((r) => this._row(r)).join("")}</div></div>`;
  }
}

const define = (tag, cls, name, description) => {
  if (!customElements.get(tag)) customElements.define(tag, cls);
  window.customCards = window.customCards || [];
  if (!window.customCards.some((c) => c.type === tag)) {
    window.customCards.push({ type: tag, name, description });
  }
};

define("house-rooms-card", HouseRoomsCard, "House rooms", "Rooms with temperature and light zones");
define("house-actions-card", HouseActionsCard, "House actions", "Home actions, sleep mode, heating, modes");
define("house-status-card", HouseStatusCard, "House status", "Quiet label/value rows");

console.info(`%c house-panel ${VERSION} `, "background:#f0b453;color:#1c1c1c;border-radius:3px");
