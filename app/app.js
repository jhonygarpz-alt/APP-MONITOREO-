/* Centinela · app de monitoreo (modo demostración con datos de ejemplo) */
(function () {
'use strict';
const D = window.DATA;
const KEY = 'centinela-v1';

/* ---------- Iconos ---------- */
const I = {
  home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  truck:'<path d="M2 6h12v10H2zM14 9h4l3 3.5V16h-7"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  alert:'<path d="M12 3.5 2.5 20h19z"/><path d="M12 10v4.5M12 17.3v.2"/>',
  proto:'<rect x="5" y="4" width="14" height="17" rx="2.5"/><path d="M9 4V3h6v1M8.5 12.5l2.2 2.2 4.6-4.6"/>',
  sos:'<path d="M6 18v-5.5a6 6 0 0 1 12 0V18M4 21h16M12 2.5v2M4 6l1.4 1.4M20 6l-1.4 1.4"/>',
  shield:'<path d="M12 3 4.5 6v6c0 4.7 3.2 7.8 7.5 9 4.3-1.2 7.5-4.3 7.5-9V6z"/><path d="m9 12 2 2 4-4"/>',
  clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  zone:'<path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  log:'<path d="M5 4h10a3 3 0 0 1 3 3v14H8a3 3 0 0 1-3-3z"/><path d="M5 18a3 3 0 0 1 3-3h10M9 8h5"/>',
  rep:'<path d="M4 20V11M10 20V5M16 20v-6M2 20.5h20"/>',
  cfg:'<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
  search:'<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h10"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  chev:'<path d="m9 6 6 6-6 6"/>',
  back:'<path d="M15 6l-6 6 6 6"/>',
  phone:'<path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4z"/>',
  send:'<path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/>',
  wifi:'<path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.8 15.8a4.8 4.8 0 0 1 6.4 0"/><circle cx="12" cy="19" r="1"/>',
  off:'<path d="M2.5 9a14 14 0 0 1 6-3.3M21.5 9a14 14 0 0 0-8-3.8M5.5 12.5a9.5 9.5 0 0 1 3.4-2M3 3l18 18"/><circle cx="12" cy="19" r="1"/>',
  moon:'<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
  check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  excl:'<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.3v.2"/>',
  diamond:'<path d="M12 3 21 12 12 21 3 12z"/>',
  map:'<path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5zM9 4v13M15 6.5v13"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  pause:'<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
  expand:'<path d="m9 6 6 6-6 6M4 4v16"/>',
  download:'<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.8v.2"/>',
  checklist:'<path d="M10 6h10M10 12h10M10 18h10"/><path d="m3.5 6 1.6 1.6L8 4.7M3.5 12l1.6 1.6L8 10.7M3.5 18l1.6 1.6L8 16.7"/>',
  badge:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 9.8-5.6"/><circle cx="17.5" cy="16.5" r="4.5"/><path d="M17.5 14.3v2.4l1.6 1"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
  bed:'<path d="M3 18V7M3 14h18v4M21 14v-2.5a3 3 0 0 0-3-3h-7v5.5"/><circle cx="7" cy="11" r="2"/>',
  calendar:'<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="m8.5 15 2.2 2.2 4.8-4.7"/>',
  car:'<path d="M5 15.5v-4l2-4.6A1.5 1.5 0 0 1 8.4 6h7.2a1.5 1.5 0 0 1 1.4.9l2 4.6v4"/><rect x="3.5" y="11.5" width="17" height="5" rx="1.5"/><path d="M6.5 16.5V19M17.5 16.5V19M7 14h1.5M15.5 14H17"/>',
  antenna:'<path d="M12 11v10M9 21h6"/><circle cx="12" cy="9" r="1.6"/><path d="M8.6 5.6a4.8 4.8 0 0 0 0 6.8M15.4 5.6a4.8 4.8 0 0 1 0 6.8M5.8 3a8.6 8.6 0 0 0 0 12M18.2 3a8.6 8.6 0 0 1 0 12M3 3l18 18"/>',
  hand:'<path d="M8 12.5V5.5a1.5 1.5 0 0 1 3 0V11M11 11V4a1.5 1.5 0 0 1 3 0v7M14 11V5.5a1.5 1.5 0 0 1 3 0V14c0 3.9-2.7 7-6.3 7-2.3 0-3.8-1-5-2.7L3.9 15.7a1.6 1.6 0 0 1 2.5-2L8 15.2"/>',
  speed:'<path d="M4.6 18.5a8.5 8.5 0 1 1 14.8 0"/><path d="m12 15 4.2-5"/><circle cx="12" cy="15" r="1.4"/><path d="M12 6.5v1.5M6.5 11.5h1.5M16 11.5h1.5"/>',
  tool:'<path d="M14.7 6.3a4 4 0 0 0 5 5L12.5 18.5a2.1 2.1 0 0 1-3-3z"/><path d="M14.7 6.3 17 4l3 3-2.3 2.3"/>',
  headset:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4.5" height="6" rx="1.5"/><rect x="16.5" y="14" width="4.5" height="6" rx="1.5"/><path d="M19 20a4 4 0 0 1-4 2h-2"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14.2A6.5 6.5 0 0 1 21.5 20"/>'
};
const svg = (k, sw, cls) => `<svg ${cls ? `class="${cls}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw || 2}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;
const ic = (k, c, lg) => `<span class="ic ${c}${lg ? ' lg' : ''}">${svg(k)}</span>`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const PR = { crit: ['CRÍTICA', 'alert'], high: ['ALTA', 'excl'], med: ['MEDIA', 'diamond'] };
const prTag = p => `<span class="pr pr-${p}">${svg(PR[p][1], 2.6)}${PR[p][0]}</span>`;
const PR_ORDER = { crit: 0, high: 1, med: 2 };

/* ---------- Estado persistente ---------- */
function freshState() {
  const now = Date.now();
  return {
    t0: now, v3: true,
    settings: { theme: 'light', big: false, rm: false, v2: true }
  };
}
let S;
try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) { S = null; }
if (!S || !S.settings) S = freshState();
if (!S.v3) { const st = S.settings; S = freshState(); S.settings = st; S.v3 = true; }
if (!S.settings.v2) { S.settings.theme = 'light'; S.settings.v2 = true; }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
/* ---------- Turnos del personal (rotación 12 h: 2 días, 2 noches, 2 descansos) ---------- */
if (!S.sched) S.sched = {};
if (!S.staff || !Array.isArray(S.staff.offsets) || S.staff.offsets.length !== D.staff.length) S.staff = { offsets: D.staff.map(p => p.offset), dayStart: D.rotation.dayStart };
if (!S.acts) S.acts = {};
const pad = n => String(n).padStart(2, '0');
const dkey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const kdate = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
const dayNum = k => { const [y, m, d] = k.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 864e5); };
const addDays = (k, n) => { const d = kdate(k); d.setDate(d.getDate() + n); return dkey(d); };
const monday = k => addDays(k, -((kdate(k).getDay() + 6) % 7));
const mod = (a, n) => ((a % n) + n) % n;
const isDay = k => /^\d{4}-\d{2}-\d{2}$/.test(k || '');
const SHIFT = { D: ['Día', 'sh-d'], N: ['Noche', 'sh-n'], R: ['Descanso', 'sh-r'] };
const POS = ['Día 1', 'Día 2', 'Noche 1', 'Noche 2', 'Descanso 1', 'Descanso 2'];
const cyclePos = (i, k) => mod(dayNum(k) - dayNum(D.rotation.anchor) + S.staff.offsets[i], D.rotation.pattern.length);
const isOverride = (i, k) => !!(S.sched[k] && S.sched[k][i]);
const rot = (i, k) => (S.sched[k] && S.sched[k][i]) || D.rotation.pattern[cyclePos(i, k)];
const hmParts = str => str.split(':').map(Number);
function onDuty() {
  const now = new Date(); const [h, m] = hmParts(S.staff.dayStart);
  const start = new Date(now); start.setHours(h, m, 0, 0);
  const end = new Date(start.getTime() + 12 * 36e5);
  let type, date, from, to;
  if (now >= start && now < end) { type = 'D'; date = dkey(now); from = start; to = end; }
  else if (now >= end) { type = 'N'; date = dkey(now); from = end; to = new Date(end.getTime() + 12 * 36e5); }
  else { type = 'N'; const y = new Date(now); y.setDate(y.getDate() - 1); date = dkey(y); from = new Date(start.getTime() - 12 * 36e5); to = start; }
  const on = D.staff.map((p, i) => Object.assign({ i }, p)).filter(p => rot(p.i, date) === type);
  return { type, date, from, to, on };
}
function shift() { const c = onDuty(); return { name: c.type === 'D' ? 'de día' : 'de noche', label: c.type === 'D' ? 'Día' : 'Noche', next: hhmm(c.to), c }; }

const proto = id => D.protocols.find(p => p.id === id);
const hhmm = t => new Date(t).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false });
const ago = t => { const m = Math.max(0, Math.round((Date.now() - t) / 60000)); return m < 1 ? 'ahora' : m < 60 ? `hace ${m} min` : `hace ${Math.floor(m / 60)} h ${m % 60} min`; };
const clock = t => { const s = Math.max(0, Math.floor((Date.now() - t) / 1000)); const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), ss = s % 60; return (h ? h + ':' : '') + String(m).padStart(2, '0') + ':' + String(ss).padStart(2, '0'); };
const me = () => D.user.name.split(' ')[0] + ' ' + D.user.name.split(' ')[1][0] + '.';

/* ---------- Navegación ---------- */
const NAV = [
  ['Operación'],
  ['inicio', 'Inicio', 'home', 'c-home'],
  ['operacion', 'Operación del día', 'calendar', 'c-op', null, null, 'https://jhonygarpz-alt.github.io/OPTIMA-DUAL-SOLUTIONS/'],
  ['actividades', 'Actividades de monitoreo', 'checklist', 'c-act'],
  ['personal', 'Personal activo y horarios', 'badge', 'c-log'],
  ['protocolos', 'Protocolos', 'proto', 'c-proto'],
  ['emergencias', 'Emergencias', 'sos', 'c-sos'],
  ['directorio', 'Directorio de operadores', 'users', 'c-unit'],
  ['Control'],
  ['seguros', 'Seguros', 'shield', 'c-ins', () => { const n = D.policies.filter(p => p.expiresDays).length; return n ? { n, cls: 'warn' } : null; }],
  ['horarios', 'Horarios de circulación', 'clock', 'c-time'],
  ['zonas', 'Zonas de riesgo', 'zone', 'c-zone'],
  ['reportes', 'Reportes', 'rep', 'c-rep'],
  ['config', 'Configuración', 'cfg', 'c-cfg']
];
const PARENT = { protocolo: 'protocolos', turnos: 'personal' };

const app = document.getElementById('app');
const view = document.getElementById('view');
const drawer = document.getElementById('drawer');
const sheetEl = document.getElementById('sheet');
const toastEl = document.getElementById('toast');
let subOpen = true, current = 'inicio';

function renderDrawer() {
  let h = `<div class="d-head">${ic('shield', 'c-brand', true)}<div class="n"><b>${esc(D.company.app)}</b><small>${esc(D.company.name)}</small></div>
    <button class="btn-ic expand" data-a="menu" aria-label="Expandir menú">${svg('expand')}</button>
    <button class="btn-ic" data-a="close" data-close aria-label="Cerrar menú">${svg('x')}</button></div>
    <label class="d-search">${svg('search')}<input type="search" id="nav-search" data-a="navfilter" placeholder="Buscar sección" aria-label="Buscar sección" autocomplete="off"></label>
    <div class="d-body">`;
  for (const n of NAV) {
    if (n.length === 1) { h += `<div class="grp">${n[0]}</div>`; continue; }
    const [id, lbl, icon, col, cntF, hasSub, ext] = n;
    const cnt = cntF && cntF();
    const cntH = cnt ? `<span class="cnt num ${cnt.cls || ''}">${cnt.n}</span>` : '';
    const mini = cnt && cnt.cls ? `<span class="mini ${cnt.cls}">${cnt.n}</span>` : '';
    const cur = (PARENT[current] || current) === id;
    h += `<div data-nav="${lbl.toLowerCase()}">`;
    {
      h += `<a class="item" href="${ext || '#' + id}" ${ext ? 'target="_blank" rel="noopener"' : 'data-go'} ${cur ? 'aria-current="page"' : ''} style="text-decoration:none;color:inherit"><span class="ic ${col}">${svg(icon)}${mini}</span><span class="lbl">${lbl}</span>${cntH}</a>`;
    }
    h += `</div>`;
  }
  const sh = shift();
  h += `</div>
    <div class="ops" aria-label="Estado del turno">
      <div><small>Turno activo</small><b>${sh.label} · hasta ${sh.next}</b></div>
      <div><small>Conexión</small><b data-net></b></div>
    </div>
    <div class="d-foot">
      <div class="row"><span class="ic c-cfg">${svg('moon')}</span><span class="lbl">Modo nocturno</span><button class="switch" role="switch" aria-checked="${isDark()}" aria-label="Modo nocturno" data-a="night"></button></div>
      <a class="row" href="#config" data-go style="text-decoration:none;color:inherit"><span class="avatar">${esc(D.user.initials)}</span><span class="lbl"><b style="display:block;font-size:13.5px">${esc(D.user.name)}</b><small>${esc(D.user.role)} · ${esc(D.user.shift)}</small></span></a>
    </div>`;
  drawer.innerHTML = h;
  paintNet();
}

/* ---------- Componentes ---------- */
const EVT = { 'P-01': 'sos', 'P-02': 'car', 'P-03': 'antenna', 'P-04': 'hand', 'P-05': 'clock', 'P-06': 'zone', 'P-07': 'speed' };
const evIc = (protoId, pr, lg) => ic(EVT[protoId] || 'alert', 't-' + pr, lg);
const lc = s => s.charAt(0).toLowerCase() + s.slice(1);

function topbar(title, sub, back) {
  const left = back
    ? `<a class="btn-ic" href="#${back}" aria-label="Volver">${svg('back')}</a>`
    : `<button class="btn-ic menu-btn" data-a="menu" aria-label="Abrir menú">${svg('menu')}</button>`;
  return `<header class="topbar"><div class="bar">${left}<button class="sos" data-a="sos">${svg('sos', 2.2)}<span class="lbl">Emergencias</span></button></div>
    <div class="t"><h1>${title}</h1><small>${sub}</small></div></header>`;
}
const secH = (t, s) => `<div class="sec-h"><h2>${t}</h2>${s !== undefined && s !== '' ? `<span>${s}</span>` : ''}</div>`;
function grouped(items, row, emptyText) {
  if (!items.length) return `<div class="empty" style="margin-top:14px">${emptyText}</div>`;
  return ['crit', 'high', 'med'].map(p => {
    const g = items.filter(x => x.pr === p); if (!g.length) return '';
    return `<section data-grp="${p}"><div class="grp-h"><span class="pdot ${p}"></span>Prioridad ${PR[p][0].toLowerCase()}<span class="n num">${g.length}</span></div><div class="group">${g.map(row).join('')}</div></section>`;
  }).join('');
}
const prSeg = () => `<div class="tabs" role="group" aria-label="Filtrar por prioridad">${[['all', 'Todos'], ['crit', 'Crítica'], ['high', 'Alta'], ['med', 'Media']].map(([v, l]) => `<button data-a="prf" data-v="${v}" aria-pressed="${v === 'all'}">${l}</button>`).join('')}</div>`;
function protoRow(p) {
  return `<a class="li" href="#protocolo-${p.id}" data-pr="${p.pr}" data-s="${esc((p.id + ' ' + p.name + ' ' + p.steps.join(' ')).toLowerCase())}">${evIc(p.id, p.pr)}
    <span class="body"><span class="ttl">${esc(p.name)}</span><span class="sub">${p.steps.length} pasos · Escalar: ${esc(lc(p.escalate))}</span></span>
    <span class="end num">${p.id}${svg('chev', 2, 'chev')}</span></a>`;
}
function contactRow(c, direct) {
  return `<div class="li" data-s="${esc((c.name + ' ' + c.number + ' ' + (c.note || '')).toLowerCase())}">${ic(c.icon, c.public ? 'c-sos' : 'c-unit', true)}<span class="body"><span class="ttl">${esc(c.name)}</span><span class="sub tel">${esc(c.number)}</span>${c.note ? `<span class="sub">${esc(c.note)}</span>` : ''}</span>
    <button class="call" data-a="${direct ? 'dialnow' : 'dial'}" data-name="${esc(c.name)}" data-num="${esc(c.number)}">Llamar</button></div>`;
}
function zoneRow(z) {
  const alto = z.level === 'alto';
  return `<a class="li" href="#zonas" data-s="${esc((z.id + ' ' + z.name + ' ' + z.state + ' ' + z.risk).toLowerCase())}">${ic('zone', alto ? 't-crit' : 't-med', true)}
    <span class="body"><span class="ttl">${esc(z.name)}</span><span class="sub">${esc(z.state)} · ${esc(z.risk)}</span><span class="tags">${alto ? `<span class="pr pr-crit">Riesgo alto</span>` : `<span class="pr pr-med">Riesgo medio</span>`}<span class="sub num" style="margin:0">${esc(z.window)}</span></span></span>${svg('chev', 2, 'chev')}</a>`;
}
const searchBox = (ph, id) => `<label class="search">${svg('search')}<input type="search" id="${id}" data-a="filter" placeholder="${ph}" aria-label="${ph}" autocomplete="off"></label>`;
const emptyBox = t => `<div class="empty" data-empty hidden style="margin-top:14px">${t}</div>`;
const callBtn = (name, number, label) => `<button class="call ${label ? 'neutral' : ''}" data-a="dial" data-name="${esc(name)}" data-num="${esc(number)}">${label || 'Llamar'}</button>`;

/* ---------- Pantallas ---------- */
const PAGES = {};

PAGES.inicio = () => topbar('Inicio', `${esc(D.company.name)} · Turno ${shift().name}`) +
  `<div data-install-slot></div>
  <nav class="apps" aria-label="Funciones de la app">${NAV.filter(n => n.length > 1 && n[0] !== 'inicio').map(([id, lbl, icon, col, cntF, , ext]) => {
    const cnt = cntF && cntF();
    return `<a class="app-i" href="${ext || '#' + id}"${ext ? ' target="_blank" rel="noopener"' : ''}><span class="ic ${col}">${svg(icon)}${cnt ? `<span class="badge num">${cnt.n}</span>` : ''}</span><span class="lbl">${lbl}</span></a>`;
  }).join('')}</nav>`;

PAGES.protocolos = () => topbar('Protocolos', `${D.protocols.length} protocolos vigentes`) +
  searchBox('Buscar protocolo', 'proto-search') + prSeg() +
  grouped(D.protocols, protoRow, 'No hay protocolos.') +
  emptyBox('No hay protocolos con ese nombre.');

PAGES.protocolo = (id) => {
  const p = proto(id); if (!p) return PAGES.protocolos();
  const contacts = D.contacts.filter(c => (p.pr === 'crit' ? ['911', '088'] : ['078']).includes(c.number) || c.name.startsWith('Cabina'));
  return topbar(`Protocolo ${p.id}`, esc(p.name), 'protocolos') +
  `<section class="banner b-${p.pr}"><div class="head">${evIc(p.id, p.pr, true)}<div class="tags">${prTag(p.pr)}</div></div><h2>${esc(p.name)}</h2><div class="meta"><span>Escalar: ${esc(lc(p.escalate))}</span><span>${p.steps.length} pasos en orden</span></div></section>
  <section class="card"><h3>${ic('proto', 'c-proto')}Pasos</h3><ol class="steps">${p.steps.map((s, k) => `<li class="st"><span class="n-step num">${k + 1}</span><span>${esc(s)}</span></li>`).join('')}</ol></section>
  ${secH('Contactos del protocolo')}<div class="group">${contacts.map(c => contactRow(c)).join('')}</div>`;
};

PAGES.emergencias = () => topbar('Emergencias', 'Toca Llamar y confirma. Los números quedan visibles para marcarlos desde otro teléfono.') +
  `${secH('Contactos de emergencia')}
  <div class="group">${D.contacts.map(c => contactRow(c)).join('')}</div>
  <div class="grp-h"><span class="pdot crit"></span>Protocolos de emergencia</div>
  <div class="group">${D.protocols.filter(p => p.pr === 'crit').map(protoRow).join('')}</div>`;

PAGES.directorio = () => {
  const list = (window.DIRECTORY || []).slice().sort((a, b) => (a.role === 'Operador') - (b.role === 'Operador') || (a.name + ' ' + a.last).localeCompare(b.name + ' ' + b.last, 'es'));
  const sites = [...new Set(list.map(p => p.site))];
  const initials = p => (p.name[0] + (p.last[0] || '')).toUpperCase();
  return topbar('Directorio de operadores', `${list.length} personas · ${list.filter(p => p.phone).length} con teléfono`) +
  searchBox('Nombre, teléfono o site', 'dir-search') +
  `<div class="tabs" role="group" aria-label="Filtrar por site"><button data-a="prf" data-v="all" aria-pressed="true">Todos</button>${sites.map(s => `<button data-a="prf" data-v="${s}" aria-pressed="false">${s === 'LRD' ? 'Nuevo Laredo' : s === 'MTY' ? 'Monterrey' : s}</button>`).join('')}</div>
  <div class="group" style="margin-top:14px">${list.map(p => `<div class="li" data-pr="${p.site}" data-s="${esc((p.name + ' ' + p.last + ' ' + p.phone + ' ' + p.phone.replace(/\D/g, '') + ' ' + p.role + ' ' + p.site).toLowerCase())}">
    <span class="avatar dir-av" aria-hidden="true">${esc(initials(p))}</span>
    <span class="body"><span class="ttl">${esc(p.name)} ${esc(p.last)}</span><span class="sub">${esc(p.role)} · ${esc(p.site)}</span>${p.phone ? `<span class="sub tel">${esc(p.phone)}</span>` : '<span class="sub">Sin teléfono registrado</span>'}</span>
    ${p.phone ? `<button class="call neutral" data-a="dial" data-name="${esc(p.name + ' ' + p.last)}" data-num="${esc(p.phone)}">Llamar</button>` : ''}</div>`).join('')}</div>
  ${emptyBox('No hay operadores con ese nombre, teléfono o site.')}`;
};

PAGES.seguros = () => topbar('Seguros', `${D.policies.length} pólizas`) +
  D.policies.map(p => `<section class="card" style="margin-top:14px">
    <h3>${ic('shield', 'c-ins')}<span style="flex:1;min-width:0">${esc(p.type)}</span>${p.expiresDays ? `<span class="pr pr-high">${svg('excl', 2.6)}Vence en ${p.expiresDays} días</span>` : `<span class="pr pr-ok">${svg('check', 2.6)}Vigente</span>`}</h3>
    <div class="kv"><div><small>Póliza</small><b class="num">${p.id}</b></div><div><small>Aseguradora</small><b>${esc(p.insurer)}</b></div>
    <div><small>Desde</small><b>${p.from}</b></div><div><small>Hasta</small><b>${p.to}</b></div>
    <div class="full"><small>Deducible</small><b>${esc(p.deductible)}</b></div></div>
    <div class="opt" style="margin-top:12px"><div class="grow"><b>Reportar siniestro</b><span class="tel">${esc(p.phone)}</span></div>${callBtn(p.insurer + ' · siniestros', p.phone)}</div>
  </section>`).join('');

PAGES.horarios = () => topbar('Horarios de circulación', `${D.schedules.length} restricciones de horario`) +
  secH('Restricciones de horario', 'Ejemplos: reemplazar por la normativa vigente') +
  `<div class="group">${D.schedules.map(s => `<div class="li">${ic('clock', 'c-time', true)}<span class="body"><span class="ttl">${esc(s.name)}</span><span class="sub num">${esc(s.window)} · ${esc(s.where)}</span><span class="sub" style="color:var(--ink-2)">${esc(s.rule)}</span></span></div>`).join('')}</div>
`;

PAGES.zonas = () => topbar('Zonas de riesgo', `${D.zones.length} zonas registradas`) +
  D.zones.map(z => {
    const alto = z.level === 'alto';
    const tag = alto ? `<span class="pr pr-crit">${svg('alert', 2.6)}Riesgo alto</span>` : `<span class="pr pr-med">${svg('diamond', 2.6)}Riesgo medio</span>`;
    return `<section class="card" style="margin-top:14px"><h3>${ic('zone', alto ? 't-crit' : 't-med', true)}<span style="flex:1;min-width:0">${esc(z.name)}<small style="display:block;font-size:13px;color:var(--ink-3);font-weight:500">${z.id} · ${esc(z.state)}</small></span></h3>
      <div style="margin-bottom:12px">${tag}</div>
      <div class="kv"><div><small>Mayor riesgo</small><b class="num">${esc(z.window)}</b></div><div><small>Tipo de riesgo</small><b>${esc(z.risk)}</b></div>
      <div class="full"><small>Indicación</small><b>${esc(z.advice)}</b></div></div></section>`;
  }).join('') +
  `${secH('Protocolo relacionado')}<div class="group">${protoRow(proto('P-06'))}</div>`;

PAGES.reportes = () => `${topbar('Reportes', `Turno ${shift().name}`)}
  <div class="empty" style="margin-top:14px">Esta sección está vacía por ahora.</div>`;

function weekGrid(wk, edit) {
  const today = dkey(new Date());
  const days = [...Array(7)].map((_, n) => addDays(wk, n));
  const head = `<div class="wk-h"></div>${D.staff.map(p => `<div class="wk-h">${esc(p.short)}</div>`).join('')}`;
  const rows = days.map(k => {
    const lbl = kdate(k).toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric' });
    return `<div class="wk-d${k === today ? ' today' : ''}">${lbl}${k === today ? '<small>Hoy</small>' : ''}</div>${D.staff.map((p, i) => {
      const [t, cls] = SHIFT[rot(i, k)];
      return edit
        ? `<button class="wk-c ${cls}${isOverride(i, k) ? ' ov' : ''}${k === today ? ' today' : ''}" data-a="cyc" data-k="${k}" data-i="${i}" aria-label="${esc(p.short)}, ${lbl}: ${t}${isOverride(i, k) ? ' (cambiado)' : ''}. Toca para cambiar">${t}</button>`
        : `<div class="wk-c ${cls}${k === today ? ' today' : ''}">${t}</div>`;
    }).join('')}`;
  }).join('');
  return `<div class="wk" style="grid-template-columns:76px repeat(${D.staff.length},minmax(0,1fr))">${head}${rows}</div>`;
}
function weekNav(page, wk) {
  const f = k => kdate(k).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
  return `<div class="wk-nav"><a class="btn-ic" href="#${page}-${addDays(wk, -7)}" aria-label="Semana anterior">${svg('back')}</a><b>${f(wk)} – ${f(addDays(wk, 6))}</b><a class="btn-ic" href="#${page}-${addDays(wk, 7)}" aria-label="Semana siguiente">${svg('chev')}</a></div>`;
}
const names = list => list.length ? list.map(p => esc(p.short)).join(' y ') : 'Sin personal asignado';
const dur = ms => { const m = Math.max(0, Math.round(ms / 6e4)); return `${Math.floor(m / 60)} h ${m % 60} min`; };
function weekText(wk) {
  const lines = [`Horario de monitoreo · semana del ${kdate(wk).toLocaleDateString('es-MX', { day: 'numeric', month: 'long' })}`, `Turno de día ${S.staff.dayStart}–${hhmm(kdate(wk).setHours(...hmParts(S.staff.dayStart)) + 12 * 36e5)} · noche de 12 h`, ''];
  for (let n = 0; n < 7; n++) {
    const k = addDays(wk, n);
    const by = t => D.staff.filter((p, i) => rot(i, k) === t).map(p => p.short).join(', ') || '—';
    lines.push(`${kdate(k).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric' })}: Día ${by('D')} · Noche ${by('N')} · Descansa ${by('R')}`);
  }
  return lines.join('\n');
}

PAGES.personal = (param) => {
  const c = onDuty(), now = Date.now(), today = dkey(new Date());
  const wk = monday(isDay(param) ? param : today);
  const nextType = c.type === 'D' ? 'N' : 'D', nextDate = c.type === 'D' ? c.date : addDays(c.date, 1);
  const nextOn = D.staff.filter((p, i) => rot(i, nextDate) === nextType);
  const rest = D.staff.filter((p, i) => rot(i, today) === 'R');
  return topbar('Personal activo y horarios', `Turnos de 12 horas · ${D.staff.length} colaboradores`) +
  `<section class="banner"><div class="head">${ic(c.type === 'D' ? 'sun' : 'moon', c.type === 'D' ? 't-med' : 'c-unit', true)}<div class="tags"><span class="pr pr-ok">${svg('check', 2.6)}En turno ahora</span><span class="pr ${c.type === 'D' ? 'pr-med' : 'pr-info'}">Turno de ${c.type === 'D' ? 'día' : 'noche'}</span></div></div>
    <h2>${names(c.on)}</h2>
    <div class="meta"><span class="num">${hhmm(c.from)} – ${hhmm(c.to)}</span><span class="num">Termina en ${dur(c.to - now)}</span></div></section>
  <div class="group" style="margin-top:12px">
    <div class="li">${ic(nextType === 'D' ? 'sun' : 'moon', nextType === 'D' ? 't-med' : 'c-unit', true)}<span class="body"><span class="sub" style="margin:0 0 2px">Siguiente turno · ${nextType === 'D' ? 'día' : 'noche'} desde las ${hhmm(c.to)}</span><span class="ttl">${names(nextOn)}</span></span></div>
    <div class="li">${ic('bed', 'c-cfg', true)}<span class="body"><span class="sub" style="margin:0 0 2px">Descansan hoy</span><span class="ttl">${names(rest)}</span></span></div>
  </div>
  ${secH('Horario de la semana')}
  <section class="card" style="margin-top:0">${weekNav('personal', wk)}${weekGrid(wk, false)}
    <a class="link" href="#turnos-${wk}">${svg('cfg')}Configurar horarios</a></section>
  ${secH('Colaboradores de monitoreo')}
  <div class="group">${D.staff.map((p, i) => { const [t, cls] = SHIFT[rot(i, today)]; return `<div class="li"><span class="avatar dir-av" aria-hidden="true">${esc(p.name.split(' ').map(w => w[0]).slice(0, 2).join(''))}</span><span class="body"><span class="ttl">${esc(p.name)}</span><span class="sub">Monitoreo · hoy en ${POS[cyclePos(i, today)].toLowerCase()} del ciclo</span></span><span class="wk-c ${cls}" style="min-width:86px">${t}</span></div>`; }).join('')}</div>`;
};

PAGES.turnos = (param) => {
  const today = dkey(new Date());
  const wk = monday(isDay(param) ? param : today);
  return topbar('Configurar horarios', 'Personal de monitoreo', 'personal-' + wk) +
  `<section class="card" style="margin-top:14px"><h3>${ic('calendar', 'c-op')}Horario por semana</h3>
    <p>Toca un día para cambiarlo: Día → Noche → Descanso. Los días cambiados a mano llevan un punto.</p>
    ${weekNav('turnos', wk)}${weekGrid(wk, true)}
    <div class="actions"><button class="act" data-a="wkreset" data-wk="${wk}">${ic('back', 'c-cfg')}<span class="grow">Volver a la rotación<small>Quita los cambios manuales de esta semana</small></span></button>
    <button class="act primary" data-a="wkshare" data-wk="${wk}">${ic('send', '')}<span class="grow">Compartir horario de la semana<small>Por WhatsApp, correo u otra app</small></span></button></div>
  </section>
  <section class="card"><h3>${ic('cfg', 'c-cfg')}Rotación</h3>
    <p>Ciclo de 6 días: 2 de día, 2 de noche y 2 de descanso. Indica en qué día del ciclo está hoy cada colaborador y la app calcula las demás semanas.</p>
    ${D.staff.map((p, i) => `<div class="row"><span class="lbl">${esc(p.name)}</span><select class="field" style="flex:0 0 140px;height:42px" id="pos-${i}" data-a="pos" data-i="${i}" aria-label="Hoy le toca a ${esc(p.short)}">${POS.map((l, n) => `<option value="${n}" ${n === cyclePos(i, today) ? 'selected' : ''}>${l}</option>`).join('')}</select></div>`).join('')}
    <div class="row"><span class="lbl">Inicio del turno de día<small>El turno de noche empieza 12 horas después</small></span><input class="field" style="flex:0 0 120px;height:42px" type="time" id="day-start" data-a="daystart" value="${esc(S.staff.dayStart)}" aria-label="Inicio del turno de día"></div>
  </section>
  <section class="card"><h3>${ic('info', 'c-cfg')}Dónde se guarda</h3><p>Los horarios se guardan en este teléfono. Para que el equipo los vea, usa <b>Compartir horario de la semana</b>.</p></section>`;
};

PAGES.actividades = () => {
  const c = onDuty(), key = c.date + '-' + c.type, st = S.acts[key] || [];
  let n = 0;
  const total = D.activities.reduce((a, g) => a + g.items.length, 0);
  const done = st.filter(Boolean).length;
  const body = D.activities.map(g => `<div class="grp-h">${esc(g.group)}<span class="n num">${g.items.length}</span></div>
    <ul class="steps">${g.items.map(it => { const k = n++; return `<li><button role="checkbox" aria-checked="${!!st[k]}" data-a="act" data-k="${k}"><span class="box">${svg('check', 3)}</span><span class="txt">${esc(it.text)}${it.suggested ? ' <span class="pr pr-info" style="margin-left:4px">Sugerida</span>' : ''}</span></button></li>`; }).join('')}</ul>`).join('');
  return topbar('Actividades de monitoreo', `Turno de ${c.type === 'D' ? 'día' : 'noche'} · ${hhmm(c.from)} – ${hhmm(c.to)}`) +
  `<section class="card" style="margin-top:14px"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px"><b style="font-size:17px">${done} de ${total} hechas</b><span style="color:var(--ink-3);font-size:13px">Se reinicia en cada turno</span></div>
    <div class="prog" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}" aria-label="Avance de actividades"><span style="width:${total ? Math.round(done / total * 100) : 0}%"></span></div></section>
  ${body}
  <div class="actions"><button class="act" data-a="actreset">${ic('back', 'c-cfg')}<span class="grow">Desmarcar todo<small>Empieza la lista de nuevo</small></span></button></div>`;
};

PAGES.config = () => {
  const seg = (v, l) => `<button data-a="theme" data-v="${v}" aria-pressed="${S.settings.theme === v}">${l}</button>`;
  return topbar('Configuración', `${esc(D.user.name)} · ${esc(D.user.role)}`) +
  `<section class="card" style="margin-top:14px"><h3>${ic('moon', 'c-cfg')}Apariencia</h3>
    <div class="tabs" style="margin:0 0 6px" role="group" aria-label="Tema">${seg('light', 'Claro')}${seg('dark', 'Nocturno')}${seg('system', 'Sistema')}</div>
    <div class="row"><span class="lbl">Texto más grande<small>Aumenta el tamaño de toda la app</small></span><button class="switch" role="switch" aria-checked="${S.settings.big}" aria-label="Texto más grande" data-a="big"></button></div>
    <div class="row"><span class="lbl">Reducir animaciones<small>También se respeta la opción del dispositivo</small></span><button class="switch" role="switch" aria-checked="${S.settings.rm}" aria-label="Reducir animaciones" data-a="rm"></button></div>
  </section>
  <section class="card"><h3>${ic('badge', 'c-log')}Horarios del personal</h3><p>Da de alta los turnos de cada semana y ajusta la rotación de 12 horas.</p><a class="btn" href="#turnos" style="display:inline-flex;align-items:center;text-decoration:none">Configurar horarios</a></section>
  <section class="card"><h3>${ic('download', 'c-unit')}Instalar en el teléfono</h3><div data-install-info></div></section>
  <section class="card"><h3>${ic('user', 'c-log')}Perfil</h3><div class="kv"><div><small>Nombre</small><b>${esc(D.user.name)}</b></div><div><small>Rol</small><b>${esc(D.user.role)}</b></div><div><small>Turno</small><b>${esc(D.user.shift)}</b></div><div><small>Empresa</small><b>${esc(D.company.name)}</b></div></div></section>
  <section class="card"><h3>${ic('info', 'c-cfg')}Modo demostración</h3>
    <p>Esta versión usa datos de ejemplo. No está conectada a GPS, a la base de datos ni a otros usuarios.</p>
  </section>
  <p style="text-align:center;color:var(--ink-3);font-size:13px;margin:18px 0 0">${esc(D.company.app)} · versión 1.8 demostración</p>`;
};

/* ---------- Router ---------- */
function parse() {
  const h = decodeURIComponent(location.hash.slice(1)) || 'inicio';
  const m = h.match(/^([a-z]+)(?:-(.+))?$/);
  if (!m || !PAGES[m[1]]) return ['inicio'];
  return [m[1], m[2]];
}
function render(keepScroll) {
  const [page, param] = parse();
  current = page;
  const top = view.scrollTop;
  if (!keepScroll) view.classList.add('enter');
  view.innerHTML = `<div class="wrap">${PAGES[page](param)}</div>`;
  if (keepScroll) view.scrollTop = top; else { view.scrollTop = 0; requestAnimationFrame(() => view.classList.remove('enter')); }
  renderDrawer(); paintNet(); paintInstall(); tick();
  document.title = `${view.querySelector('h1').textContent} · ${D.company.app}`;
}
const refresh = () => render(true);
window.addEventListener('hashchange', () => { setMenu(false); closeSheet(); render(); });

/* ---------- Menú, hojas y avisos ---------- */
const isTablet = () => matchMedia('(min-width: 768px)').matches;
function setMenu(open) {
  app.classList.toggle('menu-open', open);
  const hide = !open && !isTablet();
  drawer.inert = hide; drawer.setAttribute('aria-hidden', String(hide));
  view.inert = open && !isTablet();
  if (open) { const b = drawer.querySelector('[data-close]'); b && b.focus({ preventScroll: true }); }
}
matchMedia('(min-width: 768px)').addEventListener('change', () => setMenu(false));

let sheetCb = null;
function openSheet(html, cb) {
  sheetEl.querySelector('.sheet-c').innerHTML = html;
  sheetCb = cb || null;
  app.classList.add('sheet-on');
  const f = sheetEl.querySelector('.call, textarea, input, .btn');
  f && f.focus({ preventScroll: true });
}
function closeSheet() { app.classList.remove('sheet-on'); sheetCb = null; }
let tt;
function toast(m) { toastEl.textContent = m; toastEl.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => toastEl.classList.remove('on'), 3200); }

async function shareText(title, text) {
  try { if (navigator.share) { await navigator.share({ title, text }); return 'shared'; } } catch (e) { if (e && e.name === 'AbortError') return 'cancel'; }
  try { await navigator.clipboard.writeText(text); return 'copied'; } catch (e) {}
  return 'manual';
}
function showManual(text) {
  openSheet(`<h3>Copia el texto</h3><p>Este dispositivo no permite compartir directamente. Mantén presionado para copiar.</p><textarea class="field" readonly rows="8" id="manual-copy">${esc(text)}</textarea>`);
}
const shareMsg = { shared: 'Listo para enviar desde la app que elegiste.', copied: 'Texto copiado. Pégalo en el chat o correo del destinatario.' };

/* ---------- Eventos ---------- */
function filterList() {
  const inp = view.querySelector('[data-a="filter"]');
  const q = inp ? inp.value.trim().toLowerCase() : '';
  const pb = view.querySelector('[data-a="prf"][aria-pressed="true"]');
  const pf = pb ? pb.dataset.v : 'all';
  let n = 0, any = false;
  view.querySelectorAll('[data-s]').forEach(el => {
    any = true;
    const hide = (q && !el.dataset.s.includes(q)) || (pf !== 'all' && el.dataset.pr && el.dataset.pr !== pf);
    el.hidden = !!hide; if (!hide) n++;
  });
  view.querySelectorAll('[data-grp]').forEach(g => { g.hidden = !g.querySelector('[data-s]:not([hidden])'); });
  view.querySelectorAll('[data-hide-on-search]').forEach(x => { x.hidden = !!q; });
  view.querySelectorAll('[data-only-search]').forEach(x => { x.hidden = !q; });
  if (q) view.querySelectorAll('.group').forEach(g => { const has = g.querySelector('[data-s]'); if (has) { const sec = g.previousElementSibling; const vis = !!g.querySelector('[data-s]:not([hidden])'); g.hidden = !vis; if (sec && sec.classList.contains('sec-h')) sec.hidden = !vis; } });
  else view.querySelectorAll('.group, .sec-h').forEach(g => { g.hidden = false; });
  const e = view.querySelector('[data-empty]'); if (e) e.hidden = !any || n > 0;
}

app.addEventListener('click', async (e) => {
  const go = e.target.closest('[data-go]');
  if (go) setMenu(false);
  const b = e.target.closest('[data-a]'); if (!b) return;
  const a = b.dataset.a;
  if (a === 'menu') setMenu(!app.classList.contains('menu-open'));
  else if (a === 'close') setMenu(false);
  else if (a === 'go') location.hash = b.dataset.to;
  else if (a === 'prf') { view.querySelectorAll('[data-a="prf"]').forEach(x => x.setAttribute('aria-pressed', String(x === b))); filterList(); }
  else if (a === 'sos') {
    openSheet(`<h3>Emergencias</h3><p>Elige a quién llamar. La llamada empieza solo al tocar <b>Llamar</b>.</p>
      ${D.contacts.slice(0, 2).concat(D.contacts.filter(c => !c.public)).slice(0, 4).map(c => `<div class="opt">${ic(c.icon, c.public ? 'c-sos' : 'c-unit', true)}<div class="grow"><b>${esc(c.name)}</b><span class="tel">${esc(c.number)}</span></div><button class="call" data-a="dialnow" data-name="${esc(c.name)}" data-num="${esc(c.number)}">Llamar</button></div>`).join('')}
      <a class="link" href="#emergencias">Ver todos los contactos ${svg('chev')}</a>`);
  }
  else if (a === 'dial') {
    openSheet(`<h3>¿Llamar a ${esc(b.dataset.name)}?</h3><p>Se abrirá el marcador del teléfono.</p>
      <div class="opt">${ic('phone', 'c-rep', true)}<div class="grow"><b>${esc(b.dataset.name)}</b><span class="tel">${esc(b.dataset.num)}</span></div><button class="call" data-a="dialnow" data-name="${esc(b.dataset.name)}" data-num="${esc(b.dataset.num)}">Llamar</button></div>`);
  }
  else if (a === 'dialnow') {
    const num = b.dataset.num.replace(/[^\d+]/g, '');
    closeSheet();
    location.href = 'tel:' + num;
    toast(`Abriendo el marcador: ${b.dataset.num}. Si no se abre, márcalo a mano.`);
  }
  else if (a === 'sendnow') { if (sheetCb) await sheetCb(); }
  else if (a === 'cyc') {
    const k = b.dataset.k, i = +b.dataset.i, order = ['D', 'N', 'R'];
    const nxt = order[(order.indexOf(rot(i, k)) + 1) % 3];
    S.sched[k] = S.sched[k] || {};
    if (nxt === D.rotation.pattern[cyclePos(i, k)]) delete S.sched[k][i]; else S.sched[k][i] = nxt;
    if (!Object.keys(S.sched[k]).length) delete S.sched[k];
    save(); refresh();
  }
  else if (a === 'wkreset') { for (let n = 0; n < 7; n++) delete S.sched[addDays(b.dataset.wk, n)]; save(); refresh(); toast('La semana volvió a la rotación.'); }
  else if (a === 'wkshare') {
    const text = weekText(b.dataset.wk);
    openSheet(`<h3>¿Compartir horario?</h3><p>Elige a quién enviarlo en el siguiente paso.</p><textarea class="field" readonly rows="9" aria-label="Horario de la semana">${esc(text)}</textarea>
      <div class="opt" style="border:0"><div class="grow"></div><button class="call neutral" data-a="sendnow">Compartir</button></div>`,
      async () => { const r = await shareText('Horario de monitoreo', text); if (r === 'cancel') return; closeSheet(); r === 'manual' ? showManual(text) : toast(shareMsg[r]); });
  }
  else if (a === 'act') {
    const c = onDuty(), key = c.date + '-' + c.type, k = +b.dataset.k;
    const st = S.acts[key] = S.acts[key] || []; st[k] = !st[k];
    const keys = Object.keys(S.acts).sort(); while (keys.length > 10) delete S.acts[keys.shift()];
    save(); refresh();
  }
  else if (a === 'actreset') { const c = onDuty(); delete S.acts[c.date + '-' + c.type]; save(); refresh(); }
  else if (a === 'night') setTheme(isDark() ? 'light' : 'dark');
  else if (a === 'theme') setTheme(b.dataset.v);
  else if (a === 'big') { S.settings.big = !S.settings.big; save(); applySettings(); refresh(); }
  else if (a === 'rm') { S.settings.rm = !S.settings.rm; save(); applySettings(); refresh(); }
  else if (a === 'install') {
    if (deferredPrompt) { deferredPrompt.prompt(); const r = await deferredPrompt.userChoice; deferredPrompt = null; if (r.outcome === 'accepted') toast('Instalando Centinela…'); paintInstall(); }
  }
  else if (a === 'dismissinstall') { try { localStorage.setItem('centinela-install-dismissed', '1'); } catch (e) {} paintInstall(); }
  else if (a === 'sheetclose') closeSheet();
});

app.addEventListener('input', (e) => {
  const a = e.target.dataset.a;
  if (a === 'filter') filterList();
  if (a === 'navfilter') {
    const q = e.target.value.trim().toLowerCase();
    drawer.querySelectorAll('[data-nav]').forEach(el => el.hidden = !!q && !el.dataset.nav.includes(q));
    drawer.querySelectorAll('.grp').forEach(g => g.hidden = !!q);
  }
});
app.addEventListener('change', (e) => {
  const a = e.target.dataset.a;
  if (a === 'pos') {
    const i = +e.target.dataset.i, today = dkey(new Date());
    S.staff.offsets[i] = mod(+e.target.value - (dayNum(today) - dayNum(D.rotation.anchor)), D.rotation.pattern.length);
    save(); refresh(); toast('Rotación actualizada.');
  } else if (a === 'daystart' && /^\d{2}:\d{2}$/.test(e.target.value)) {
    S.staff.dayStart = e.target.value; save(); refresh(); renderDrawer(); toast('Horario de turno actualizado.');
  }
});
app.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target, kind = f.dataset.form;
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeSheet(); setMenu(false); } });

/* ---------- Tema y ajustes ---------- */
function isDark() { const t = document.documentElement.dataset.theme; return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; }
function setTheme(v) { S.settings.theme = v; save(); applySettings(); refresh(); }
function applySettings() {
  const r = document.documentElement;
  if (S.settings.theme === 'system') delete r.dataset.theme; else r.dataset.theme = S.settings.theme;
  r.classList.toggle('rm', !!S.settings.rm);
  app.classList.toggle('big', !!S.settings.big);
  const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = isDark() ? '#000000' : '#f2f2f7';
  document.querySelectorAll('[data-a="night"]').forEach(s => s.setAttribute('aria-checked', String(isDark())));
}
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { applySettings(); });

/* ---------- Conexión real y reloj ---------- */
function paintNet() {
  const on = navigator.onLine;
  document.querySelectorAll('[data-net]').forEach(el => el.innerHTML = `<span class="dot ${on ? '' : 'off'}"></span>${on ? 'En línea' : 'Sin conexión'}`);
}
window.addEventListener('online', paintNet); window.addEventListener('offline', paintNet);
let lastSync = Date.now();
function tick() {
  if (Date.now() - lastSync > 30000) lastSync = Date.now();
  const s = Math.floor((Date.now() - lastSync) / 1000);
  document.querySelectorAll('[data-tick]').forEach(t => t.textContent = s);
  document.querySelectorAll('[data-since]').forEach(t => t.textContent = clock(+t.dataset.since));
}
setInterval(tick, 1000);

/* ---------- Instalación ---------- */
let deferredPrompt = null;
const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; paintInstall(); });
window.addEventListener('appinstalled', () => { deferredPrompt = null; paintInstall(); toast('Centinela quedó instalada.'); });
function paintInstall() {
  let dismissed = false; try { dismissed = localStorage.getItem('centinela-install-dismissed') === '1'; } catch (e) {}
  const slot = view.querySelector('[data-install-slot]');
  if (slot) slot.innerHTML = (!standalone() && !dismissed && (deferredPrompt || ios))
    ? `<div class="install glass">${ic('download', 'c-unit')}<div class="grow"><b style="font-size:15px">Instala Centinela</b><div style="font-size:13px;color:var(--ink-3)">${deferredPrompt ? 'Ábrela como app desde tu pantalla de inicio.' : 'En Safari: Compartir → Agregar a inicio.'}</div></div>${deferredPrompt ? '<button class="btn" data-a="install">Instalar</button>' : ''}<button class="btn-ic" data-a="dismissinstall" aria-label="Ocultar aviso" style="width:40px;height:40px">${svg('x')}</button></div>`
    : '';
  const info = view.querySelector('[data-install-info]');
  if (info) info.innerHTML = standalone()
    ? '<p>Centinela ya está instalada en este dispositivo.</p>'
    : deferredPrompt
      ? '<p>Instálala para abrirla desde la pantalla de inicio, a pantalla completa.</p><button class="btn" data-a="install">Instalar app</button>'
      : `<p><b>iPhone:</b> abre esta página en Safari, toca Compartir y luego <b>Agregar a inicio</b>.</p><p><b>Android:</b> abre en Chrome, toca el menú ⋮ y luego <b>Instalar app</b> o <b>Agregar a la pantalla principal</b>.</p>`;
}

/* ---------- Arranque ---------- */
applySettings();
render();
setMenu(false);
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
})();
