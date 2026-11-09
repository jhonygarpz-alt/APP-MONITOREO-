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
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.8v.2"/>'
};
const svg = (k, sw, cls) => `<svg ${cls ? `class="${cls}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw || 2}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;
const ic = (k, c, lg) => `<span class="ic ${c}${lg ? ' lg' : ''}">${svg(k)}</span>`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const PR = { crit: ['CRÍTICA', 'alert'], high: ['ALTA', 'excl'], med: ['MEDIA', 'diamond'] };
const prTag = p => `<span class="pr pr-${p}">${svg(PR[p][1], 2.6)}${PR[p][0]}</span>`;
const PR_ORDER = { crit: 0, high: 1, med: 2 };
const STATUS = {
  senal:   { tag: 'off',  label: 'SIN SEÑAL',        icon: 'off',     filter: 'Sin señal' },
  horario: { tag: 'high', label: 'FUERA DE HORARIO', icon: 'clock',   filter: 'Fuera de horario' },
  detenida:{ tag: 'high', label: 'DETENIDA',         icon: 'pause',   filter: 'Detenidas' },
  zona:    { tag: 'med',  label: 'ZONA DE RIESGO',   icon: 'diamond', filter: 'Zona de riesgo' },
  ruta:    { tag: 'ok',   label: 'EN RUTA',          icon: 'check',   filter: 'En ruta' }
};
const unitTag = u => { const s = STATUS[u.status]; const label = u.status === 'senal' ? `SIN SEÑAL ${u.signalMin} MIN` : s.label; return `<span class="pr pr-${s.tag}">${svg(s.icon, 2.6)}${label}</span>`; };
const INC_STATUS = { activa: ['Sin atender', 'pr-crit'], atencion: ['En atención', 'pr-info'], cerrada: ['Cerrado', 'pr-muted'] };

/* ---------- Estado persistente ---------- */
function freshState() {
  const now = Date.now();
  return {
    t0: now,
    inc: Object.fromEntries(D.incidents.map(i => [i.id, { status: i.status, owner: i.owner || '', closedNote: i.closedNote || '', notes: [], steps: [] }])),
    log: D.log.map(([m, cat, text]) => ({ t: now - m * 60000, cat, text })),
    handover: D.handover.map(() => false),
    settings: { theme: 'system', big: false, rm: false }
  };
}
let S;
try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) { S = null; }
if (!S || !S.inc || !S.settings) S = freshState();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

const unit = id => D.units.find(u => u.id === id);
const incs = () => D.incidents.map(i => Object.assign({}, i, S.inc[i.id], { opened: S.t0 - i.openedMin * 60000 }));
const inc = id => incs().find(i => i.id === id);
const proto = id => D.protocols.find(p => p.id === id);
const sortInc = a => a.sort((x, y) => PR_ORDER[x.pr] - PR_ORDER[y.pr] || y.opened - x.opened);
const hhmm = t => new Date(t).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false });
const ago = t => { const m = Math.max(0, Math.round((Date.now() - t) / 60000)); return m < 1 ? 'ahora' : m < 60 ? `hace ${m} min` : `hace ${Math.floor(m / 60)} h ${m % 60} min`; };
const clock = t => { const s = Math.max(0, Math.floor((Date.now() - t) / 1000)); const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), ss = s % 60; return (h ? h + ':' : '') + String(m).padStart(2, '0') + ':' + String(ss).padStart(2, '0'); };
const me = () => D.user.name.split(' ')[0] + ' ' + D.user.name.split(' ')[1][0] + '.';
function shift() {
  const h = new Date().getHours();
  if (h >= 6 && h < 14) return { name: 'Matutino C', next: '14:00' };
  if (h >= 14 && h < 22) return { name: 'Vespertino A', next: '22:00' };
  return { name: 'Nocturno B', next: '06:00' };
}
function counts() {
  const all = incs();
  const open = all.filter(i => i.status !== 'cerrada');
  return {
    pending: all.filter(i => i.status === 'activa').length,
    open: open.length,
    openCrit: open.some(i => i.pr === 'crit'),
    atencion: all.filter(i => i.status === 'atencion').length,
    closed: all.filter(i => i.status === 'cerrada').length,
    crit: open.filter(i => i.pr === 'crit').length,
    critPending: all.filter(i => i.status === 'activa' && i.pr === 'crit').length,
    signal: D.units.filter(u => u.status === 'senal').length,
    horario: D.units.filter(u => u.status === 'horario').length,
    zone: D.units.filter(u => u.zone).length
  };
}
function addLog(cat, text) { S.log.unshift({ t: Date.now(), cat, text }); save(); }

/* ---------- Navegación ---------- */
const NAV = [
  ['Operación'],
  ['inicio', 'Inicio', 'home', 'c-home'],
  ['unidades', 'Unidades y viajes', 'truck', 'c-unit', () => ({ n: D.units.length })],
  ['alertas', 'Alertas e incidentes', 'alert', 'c-alert', () => { const c = counts(); return { n: c.open, cls: c.openCrit ? 'crit' : 'warn' }; }, true],
  ['protocolos', 'Protocolos', 'proto', 'c-proto'],
  ['emergencias', 'Emergencias', 'sos', 'c-sos'],
  ['Control'],
  ['seguros', 'Seguros', 'shield', 'c-ins', () => { const n = D.policies.filter(p => p.expiresDays).length; return n ? { n, cls: 'warn' } : null; }],
  ['horarios', 'Horarios de circulación', 'clock', 'c-time', () => { const n = counts().horario; return n ? { n, cls: 'warn' } : null; }],
  ['zonas', 'Zonas de riesgo', 'zone', 'c-zone', () => { const n = counts().zone; return n ? { n, cls: 'warn' } : null; }],
  ['bitacora', 'Bitácora y relevo', 'log', 'c-log', () => ({ n: shift().next })],
  ['reportes', 'Reportes', 'rep', 'c-rep'],
  ['config', 'Configuración', 'cfg', 'c-cfg']
];
const PARENT = { unidad: 'unidades', incidente: 'alertas', protocolo: 'protocolos' };

const app = document.getElementById('app');
const view = document.getElementById('view');
const drawer = document.getElementById('drawer');
const sheetEl = document.getElementById('sheet');
const toastEl = document.getElementById('toast');
let subOpen = true, current = 'inicio';

function renderDrawer() {
  const c = counts();
  let h = `<div class="d-head">${ic('shield', 'c-brand', true)}<div class="n"><b>${esc(D.company.app)}</b><small>${esc(D.company.name)}</small></div>
    <button class="btn-ic expand" data-a="menu" aria-label="Expandir menú">${svg('expand')}</button>
    <button class="btn-ic" data-a="close" data-close aria-label="Cerrar menú">${svg('x')}</button></div>
    <label class="d-search">${svg('search')}<input type="search" id="nav-search" data-a="navfilter" placeholder="Buscar sección" aria-label="Buscar sección" autocomplete="off"></label>
    <div class="d-body">`;
  for (const n of NAV) {
    if (n.length === 1) { h += `<div class="grp">${n[0]}</div>`; continue; }
    const [id, lbl, icon, col, cntF, hasSub] = n;
    const cnt = cntF && cntF();
    const cntH = cnt ? `<span class="cnt num ${cnt.cls || ''}">${cnt.n}</span>` : '';
    const mini = cnt && cnt.cls ? `<span class="mini ${cnt.cls}">${cnt.n}</span>` : '';
    const cur = (PARENT[current] || current) === id;
    h += `<div data-nav="${lbl.toLowerCase()}">`;
    if (hasSub) {
      h += `<button class="item" data-a="toggle" data-id="${id}" aria-expanded="${subOpen}" ${cur ? 'aria-current="page"' : ''}>
        <span class="ic ${col}">${svg(icon)}${mini}</span><span class="lbl">${lbl}</span>${cntH}${svg('chev', 2, 'chev')}</button>
        <div class="sub ${subOpen ? 'open' : ''}"><div>
          <a href="#alertas" data-go>Activas<span class="cnt num ${c.pending ? 'crit' : ''}">${c.pending}</span></a>
          <a href="#alertas-atencion" data-go>En atención<span class="cnt num">${c.atencion}</span></a>
          <a href="#alertas-cerradas" data-go>Cerradas hoy<span class="cnt num">${c.closed}</span></a>
        </div></div>`;
    } else {
      h += `<a class="item" href="#${id}" data-go ${cur ? 'aria-current="page"' : ''} style="text-decoration:none;color:inherit"><span class="ic ${col}">${svg(icon)}${mini}</span><span class="lbl">${lbl}</span>${cntH}</a>`;
    }
    h += `</div>`;
  }
  const sh = shift();
  h += `</div>
    <div class="ops" aria-label="Estado del turno">
      <div><small>Turno activo</small><b>${sh.name}</b></div>
      <div><small>Conexión</small><b data-net></b></div>
      <div><small>Actualización</small><b class="num">hace <span data-tick>0</span> s</b></div>
      <div><small>Pendientes</small><b class="num">${c.pending} · relevo ${sh.next}</b></div>
    </div>
    <div class="d-foot">
      <div class="row"><span class="ic c-cfg">${svg('moon')}</span><span class="lbl">Modo nocturno</span><button class="switch" role="switch" aria-checked="${isDark()}" aria-label="Modo nocturno" data-a="night"></button></div>
      <a class="row" href="#config" data-go style="text-decoration:none;color:inherit"><span class="avatar">${esc(D.user.initials)}</span><span class="lbl"><b style="display:block;font-size:13.5px">${esc(D.user.name)}</b><small>${esc(D.user.role)} · ${esc(D.user.shift)}</small></span></a>
    </div>`;
  drawer.innerHTML = h;
  paintNet();
}

/* ---------- Componentes ---------- */
function topbar(title, sub, back) {
  const c = counts();
  const left = back
    ? `<a class="btn-ic glass" href="#${back}" aria-label="Volver">${svg('back')}</a>`
    : `<button class="btn-ic glass menu-btn" data-a="menu" aria-label="Abrir menú. ${c.pending} pendientes">${svg('menu')}${c.pending ? `<span class="badge num">${c.pending}</span>` : ''}</button>`;
  return `<header class="topbar glass">${left}<div class="t"><h1>${title}</h1><small>${sub}</small></div>
    <button class="sos" data-a="sos">${svg('sos', 2.2)}<span class="lbl">Emergencias</span></button></header>`;
}
const secH = (t, s) => `<div class="sec-h"><h2>${t}</h2>${s ? `<span>${s}</span>` : ''}</div>`;
function incRow(i) {
  const u = unit(i.unit);
  const icn = i.pr === 'crit' ? ['alert', 'c-alert'] : i.pr === 'high' ? ['clock', 'c-time'] : ['zone', 'c-zone'];
  const st = INC_STATUS[i.status];
  return `<a class="alert opaque ${i.pr === 'crit' && i.status !== 'cerrada' ? 'crit' : ''}" href="#incidente-${i.id}" data-s="${esc([i.id, u.id, u.plate, u.driver, i.title].join(' ').toLowerCase())}" style="color:inherit">
    ${ic(icn[0], icn[1])}
    <span><span class="row1">${prTag(i.pr)}${i.status !== 'activa' ? `<span class="pr ${st[1]}">${st[0]}</span>` : ''}<span class="meta num" style="margin:0">${i.id}</span></span>
    <span class="ttl">${esc(i.title)}</span><span class="meta">${u.id} · ${u.plate} · ${esc(u.driver)} · ${ago(i.opened)}</span></span>
    ${svg('chev', 2, 'chev')}</a>`;
}
function unitRow(u) {
  return `<a class="unit glass" href="#unidad-${u.id}" data-s="${esc([u.id, u.plate, u.driver, u.route, STATUS[u.status].label, u.trip].join(' ').toLowerCase())}" data-st="${u.status}" style="color:inherit">
    ${ic('truck', 'c-unit')}<div class="grow"><div class="u">${u.id} <span class="m num">· ${u.plate}</span></div><div class="m">${esc(u.driver)} · ${esc(u.route)}</div></div>${unitTag(u)}</a>`;
}
const searchBox = (ph, id) => `<label class="search glass">${svg('search')}<input type="search" id="${id}" data-a="filter" placeholder="${ph}" aria-label="${ph}" autocomplete="off"></label>`;
const emptyBox = t => `<div class="empty glass" data-empty hidden>${t}</div>`;
const callBtn = (name, number, label) => `<button class="call ${label ? 'neutral' : ''}" data-a="dial" data-name="${esc(name)}" data-num="${esc(number)}">${label || 'Llamar'}</button>`;

/* ---------- Pantallas ---------- */
const PAGES = {};

PAGES.inicio = () => {
  const c = counts();
  const att = sortInc(incs().filter(i => i.status !== 'cerrada'));
  return topbar('Inicio', `${esc(D.company.name)} · Turno ${shift().name.toLowerCase()}`) +
  `<div data-install-slot></div>
  ${searchBox('Unidad, placa, operador o folio', 'home-search')}
  <div class="pulse">
    <span class="chip"><span data-net></span></span>
    <span class="chip num">Actualizado hace <span data-tick>0</span> s</span>
    <span class="chip">${c.pending} pendientes</span>
    <span class="chip demo">${svg('info', 2.4).replace('<svg', '<svg width="13" height="13"')}Datos de ejemplo</span>
  </div>
  <div class="kpis">
    <a class="kpi glass" href="#unidades" style="color:inherit;text-decoration:none"><div class="top">${ic('truck', 'c-unit', true)}<span class="pr pr-ok">${svg('check', 2.6)}OK</span></div><div class="v num">${D.units.length}</div><div><div class="l">Unidades activas</div><div class="s">${D.units.filter(u => u.status === 'ruta').length} en ruta normal</div></div></a>
    <a class="kpi is-crit" href="#unidades-senal" style="color:inherit;text-decoration:none"><div class="top">${ic('off', 'c-alert', true)}${prTag('crit')}</div><div class="v num">${c.signal}</div><div><div class="l">Sin comunicación</div><div class="s">más de 5 min sin señal</div></div></a>
    <a class="kpi is-high" href="#unidades-horario" style="color:inherit;text-decoration:none"><div class="top">${ic('clock', 'c-time', true)}${prTag('high')}</div><div class="v num">${c.horario}</div><div><div class="l">Viajes fuera de horario</div><div class="s">restricción 23:00 – 05:00</div></div></a>
    <a class="kpi ${c.crit ? 'is-crit' : 'glass'}" href="#alertas" style="color:inherit;text-decoration:none"><div class="top">${ic('alert', 'c-sos', true)}${c.crit ? prTag('crit') : ''}</div><div class="v num">${c.crit}</div><div><div class="l">Alertas críticas</div><div class="s">sin atender: ${c.critPending}</div></div></a>
  </div>
  ${secH('Requieren atención', 'Ordenadas por prioridad')}
  <div class="list">${att.map(incRow).join('') || '<div class="empty glass">No hay incidentes abiertos.</div>'}</div>
  ${secH('Unidades', `${D.units.length} en operación`)}
  <div class="list">${D.units.map(unitRow).join('')}</div>
  ${emptyBox('Sin resultados. Prueba con otra unidad, placa, operador o folio.')}`;
};

PAGES.unidades = (f) => {
  f = f && STATUS[f] ? f : 'todas';
  const btn = (k, l) => `<button data-a="ufilter" data-f="${k}" aria-pressed="${f === k}">${l}</button>`;
  return topbar('Unidades y viajes', `${D.units.length} unidades en operación`) +
  searchBox('Unidad, placa, operador o viaje', 'units-search') +
  `<div class="filters" role="group" aria-label="Filtrar por estado">${btn('todas', 'Todas')}${Object.entries(STATUS).map(([k, s]) => btn(k, s.filter)).join('')}</div>
  <div class="list" style="margin-top:6px">${D.units.slice().sort((a, b) => (a.status === 'ruta') - (b.status === 'ruta')).map(unitRow).join('')}</div>
  ${emptyBox('No hay unidades con ese filtro o búsqueda.')}`;
};

PAGES.unidad = (id) => {
  const u = unit(id); if (!u) return PAGES.unidades();
  const s = STATUS[u.status];
  const bcls = s.tag === 'off' ? 'b-crit' : s.tag === 'high' ? 'b-high' : s.tag === 'med' ? 'b-med' : 'b-ok';
  const open = sortInc(incs().filter(i => i.unit === u.id && i.status !== 'cerrada'));
  const pol = D.policies.find(p => p.units.includes(u.id));
  const z = u.zone && D.zones.find(z => z.id === u.zone);
  return topbar(u.id, `${u.plate} · ${esc(u.driver)}`, 'unidades') +
  `<section class="banner ${bcls}"><div class="tags">${unitTag(u)}<span class="num" style="font-size:12px;font-weight:700">${u.speed} km/h</span></div>
    <h2>${esc(u.route)}</h2><div class="meta"><span>Viaje ${u.trip}</span><span>ETA ${u.eta}</span></div></section>
  <div class="actions">
    <button class="act primary" data-a="dial" data-name="${esc(u.driver)}" data-num="${esc(u.phone)}">${ic('phone', 'c-rep')}<span class="grow">Llamar al operador<small>Se confirma antes de marcar</small></span></button>
    <a class="act opaque" href="https://www.google.com/maps?q=${u.lat},${u.lng}" target="_blank" rel="noopener">${ic('map', 'c-unit')}<span class="grow">Abrir ubicación en Mapas<small>Última posición registrada</small></span></a>
  </div>
  <section class="card opaque"><h3>${ic('truck', 'c-unit')}Unidad y viaje</h3><div class="kv">
    <div><small>Placa</small><b class="num">${u.plate}</b></div><div><small>Operador</small><b>${esc(u.driver)}</b></div>
    <div><small>Cliente</small><b>${esc(u.client)}</b></div><div><small>Carga</small><b>${esc(u.cargo)}</b></div>
    <div class="full"><small>Última posición</small><b>${esc(u.pos)}</b></div>
    <div><small>Última señal</small><b class="num">${hhmm(S.t0 - u.signalMin * 60000)}</b></div><div><small>Teléfono</small><b class="num tel">${esc(u.phone)}</b></div>
  </div></section>
  ${open.length ? secH('Incidentes abiertos', open.length) + `<div class="list">${open.map(incRow).join('')}</div>` : ''}
  ${z ? `<section class="card opaque"><h3>${ic('zone', 'c-zone')}Dentro de zona de riesgo</h3><p><b>${z.id} · ${esc(z.name)}</b>. ${esc(z.risk)}. ${esc(z.advice)}</p><a class="link" href="#zonas">Ver zonas de riesgo ${svg('chev')}</a></section>` : ''}
  ${pol ? `<section class="card opaque"><h3>${ic('shield', 'c-ins')}Seguro</h3><div class="kv"><div><small>Póliza</small><b class="num">${pol.id}</b></div><div><small>Vigencia</small><b>${pol.to}</b></div><div class="full"><small>Cobertura</small><b>${esc(pol.type)}</b></div></div><a class="link" href="#seguros">Ver seguros ${svg('chev')}</a></section>` : ''}`;
};

PAGES.alertas = (tab) => {
  tab = ['atencion', 'cerradas'].includes(tab) ? tab : 'activas';
  const st = { activas: 'activa', atencion: 'atencion', cerradas: 'cerrada' }[tab];
  const list = sortInc(incs().filter(i => i.status === st));
  const c = counts();
  const t = (k, l, n) => `<button role="tab" aria-selected="${tab === k}" data-a="go" data-to="${k === 'activas' ? 'alertas' : 'alertas-' + k}">${l} <span class="cnt num">${n}</span></button>`;
  return topbar('Alertas e incidentes', `${c.open} abiertos · ${c.crit} críticos`) +
  `<div class="tabs glass" role="tablist">${t('activas', 'Activas', c.pending)}${t('atencion', 'En atención', c.atencion)}${t('cerradas', 'Cerradas', c.closed)}</div>
  ${searchBox('Folio, unidad, placa u operador', 'alerts-search')}
  <div class="list" style="margin-top:12px">${list.map(incRow).join('') || `<div class="empty glass">${tab === 'activas' ? 'No hay incidentes sin atender.' : 'Sin incidentes en esta lista.'}</div>`}</div>
  ${emptyBox('Sin resultados para esa búsqueda.')}`;
};

PAGES.incidente = (id) => {
  const i = inc(id); if (!i) return PAGES.alertas();
  const u = unit(i.unit), p = proto(i.protocol), st = INC_STATUS[i.status];
  const steps = p.steps.map((s, k) => `<li><button role="checkbox" aria-checked="${!!i.steps[k]}" data-a="step" data-inc="${i.id}" data-k="${k}" ${i.status === 'cerrada' ? 'disabled' : ''}><span class="box">${svg('check', 3)}</span><span class="txt">${esc(s)}</span></button></li>`).join('');
  const ev = [...i.notes.map(n => [n.t, n.text]), ...i.events.map(([m, t]) => [S.t0 - m * 60000, t])].sort((a, b) => b[0] - a[0]);
  const closed = i.status === 'cerrada';
  return topbar('Incidente', `${i.id}${i.owner ? ' · ' + (i.owner === D.user.name ? 'Asignado a ti' : esc(i.owner)) : ''}`, 'alertas') +
  `<section class="banner b-${i.pr}" aria-label="Prioridad ${PR[i.pr][0].toLowerCase()}">
    <div class="tags">${prTag(i.pr)}<span class="pr ${st[1]}">${st[0]}</span></div>
    <h2>${esc(i.title)}</h2>
    <div class="meta">${closed ? `<span>Cerrado · abierto a las ${hhmm(i.opened)}</span>` : `<span>Abierto hace <span class="num" data-since="${i.opened}">${clock(i.opened)}</span></span><span>Escalar: ${esc(p.escalate)}</span>`}</div>
  </section>
  ${closed ? `<section class="card opaque"><h3>${ic('check', 'c-rep')}Nota de cierre</h3><p>${esc(i.closedNote)}</p></section>` : `<div class="actions">
    ${i.status === 'activa' ? `<button class="act danger" data-a="take" data-inc="${i.id}">${ic('user', 'c-sos')}<span class="grow">Atender incidente<small>Se asigna a ti y queda en bitácora</small></span></button>` : ''}
    <button class="act primary" data-a="dial" data-name="${esc(u.driver)}" data-num="${esc(u.phone)}">${ic('phone', 'c-rep')}<span class="grow">Llamar al operador<small>Se confirma antes de marcar</small></span></button>
    <button class="act opaque" data-a="report" data-inc="${i.id}">${ic('send', 'c-unit')}<span class="grow">Enviar reporte<small>Al cliente y a la base · requiere confirmación</small></span></button>
    <button class="act opaque" data-a="closeinc" data-inc="${i.id}">${ic('check', 'c-cfg')}<span class="grow">Cerrar incidente<small>Pide nota de cierre</small></span></button>
  </div>`}
  <section class="card opaque"><h3>${ic('truck', 'c-unit')}Unidad y viaje</h3><div class="kv">
    <div><small>Unidad</small><b><a href="#unidad-${u.id}">${u.id}</a></b></div><div><small>Placa</small><b class="num">${u.plate}</b></div>
    <div><small>Operador</small><b>${esc(u.driver)}</b></div><div><small>Viaje</small><b class="num">${u.trip}</b></div>
    <div class="full"><small>Ruta</small><b>${esc(u.route)} · ${esc(u.cargo)}</b></div>
    <div class="full"><small>Última posición</small><b>${esc(u.pos)}</b></div>
    <div><small>Última señal</small><b class="num">${hhmm(S.t0 - u.signalMin * 60000)}</b></div><div><small>Velocidad</small><b class="num">${u.speed} km/h</b></div>
  </div><a class="link" href="https://www.google.com/maps?q=${u.lat},${u.lng}" target="_blank" rel="noopener">${svg('map')}Abrir ubicación en Mapas</a></section>
  <section class="card opaque"><h3>${ic('proto', 'c-proto')}Protocolo ${p.id} · ${esc(p.name)}</h3><ul class="steps">${steps}</ul></section>
  <section class="card opaque"><h3>${ic('log', 'c-log')}Bitácora del incidente</h3>
    <ol class="tl">${ev.map(([t, x]) => `<li><time class="num">${hhmm(t)}</time><span>${esc(x)}</span></li>`).join('')}</ol>
    ${closed ? '' : `<form class="note" data-form="incnote" data-inc="${i.id}"><input id="note-${i.id}" placeholder="Agregar nota" aria-label="Nota para la bitácora del incidente" autocomplete="off"><button type="submit">Agregar</button></form>`}
  </section>`;
};

PAGES.protocolos = () => topbar('Protocolos', `${D.protocols.length} protocolos vigentes`) +
  searchBox('Buscar protocolo', 'proto-search') +
  `<div class="list" style="margin-top:12px">${D.protocols.map(p => `<a class="alert opaque" href="#protocolo-${p.id}" data-s="${esc((p.id + ' ' + p.name).toLowerCase())}" style="color:inherit">${ic('proto', 'c-proto')}
    <span><span class="row1">${prTag(p.pr)}<span class="meta num" style="margin:0">${p.id}</span></span><span class="ttl">${esc(p.name)}</span><span class="meta">${p.steps.length} pasos · escalar: ${esc(p.escalate)}</span></span>${svg('chev', 2, 'chev')}</a>`).join('')}</div>
  ${emptyBox('No hay protocolos con ese nombre.')}`;

PAGES.protocolo = (id) => {
  const p = proto(id); if (!p) return PAGES.protocolos();
  const open = incs().filter(i => i.protocol === p.id && i.status !== 'cerrada');
  return topbar(`Protocolo ${p.id}`, esc(p.name), 'protocolos') +
  `<section class="banner b-${p.pr}"><div class="tags">${prTag(p.pr)}</div><h2>${esc(p.name)}</h2><div class="meta"><span>Escalar: ${esc(p.escalate)}</span><span>${p.steps.length} pasos en orden</span></div></section>
  <section class="card opaque"><h3>${ic('proto', 'c-proto')}Pasos</h3><ol class="steps">${p.steps.map((s, k) => `<li class="st"><span class="n-step num">${k + 1}</span><span>${esc(s)}</span></li>`).join('')}</ol></section>
  <section class="card opaque"><h3>${ic('sos', 'c-sos')}Contactos del protocolo</h3>
    ${D.contacts.filter(c => (p.pr === 'crit' ? ['911', '088'] : ['078']).includes(c.number) || c.name.startsWith('Cabina')).map(c => `<div class="opt"><div class="grow"><b>${esc(c.name)}</b><span class="tel">${esc(c.number)}</span></div>${callBtn(c.name, c.number)}</div>`).join('')}
  </section>
  ${open.length ? secH('Incidentes abiertos con este protocolo', open.length) + `<div class="list">${sortInc(open).map(incRow).join('')}</div>` : ''}`;
};

PAGES.emergencias = () => {
  const crit = sortInc(incs().filter(i => i.status !== 'cerrada' && i.pr === 'crit'));
  return topbar('Emergencias', 'Cada llamada se confirma con un toque') +
  `<section class="card opaque" style="margin-top:12px"><h3>${ic('sos', 'c-sos')}Contactos de emergencia</h3>
    <p>Toca <b>Llamar</b> y luego confirma. Los números quedan visibles por si necesitas marcarlos desde otro teléfono.</p>
    ${D.contacts.map(c => `<div class="opt">${ic(c.icon, c.public ? 'c-sos' : 'c-cfg')}<div class="grow"><b>${esc(c.name)}</b><span class="tel">${esc(c.number)}</span><span style="display:block;font-size:11.5px;color:var(--ink-3)">${esc(c.note)}</span></div>${callBtn(c.name, c.number)}</div>`).join('')}
  </section>
  ${crit.length ? secH('Incidentes críticos abiertos', crit.length) + `<div class="list">${crit.map(incRow).join('')}</div>` : ''}
  ${secH('Protocolos de emergencia')}
  <div class="list">${D.protocols.filter(p => p.pr === 'crit').map(p => `<a class="alert opaque" href="#protocolo-${p.id}" style="color:inherit">${ic('proto', 'c-proto')}<span><span class="row1">${prTag(p.pr)}<span class="meta num" style="margin:0">${p.id}</span></span><span class="ttl">${esc(p.name)}</span></span>${svg('chev', 2, 'chev')}</a>`).join('')}</div>`;
};

PAGES.seguros = () => topbar('Seguros', `${D.policies.length} pólizas`) +
  D.policies.map(p => `<section class="card opaque" style="margin-top:12px">
    <h3>${ic('shield', 'c-ins')}<span class="grow">${esc(p.type)}</span>${p.expiresDays ? `<span class="pr pr-high">${svg('excl', 2.6)}VENCE EN ${p.expiresDays} DÍAS</span>` : `<span class="pr pr-ok">${svg('check', 2.6)}VIGENTE</span>`}</h3>
    <div class="kv"><div><small>Póliza</small><b class="num">${p.id}</b></div><div><small>Aseguradora</small><b>${esc(p.insurer)}</b></div>
    <div><small>Desde</small><b>${p.from}</b></div><div><small>Hasta</small><b>${p.to}</b></div>
    <div class="full"><small>Deducible</small><b>${esc(p.deductible)}</b></div>
    <div class="full"><small>Unidades cubiertas</small><div class="units-mini">${p.units.map(id => `<a href="#unidad-${id}">${id}</a>`).join('')}</div></div></div>
    <div class="opt" style="margin-top:10px"><div class="grow"><b>Reportar siniestro</b><span class="tel">${esc(p.phone)}</span></div>${callBtn('Aseguradora · siniestros', p.phone)}</div>
  </section>`).join('');

PAGES.horarios = () => {
  const out = D.units.filter(u => u.status === 'horario');
  return topbar('Horarios de circulación', `${out.length} viajes fuera de horario`) +
  (out.length ? secH('Fuera de horario ahora', out.length) + `<div class="list">${out.map(u => { const i = incs().find(x => x.unit === u.id && x.status !== 'cerrada'); return i ? incRow(i) : unitRow(u); }).join('')}</div>` : '') +
  secH('Reglas', 'Ejemplos: reemplazar por la normativa vigente') +
  `<div class="list">${D.schedules.map(s => `<section class="card opaque" style="margin:0"><h3>${ic('clock', 'c-time')}<span class="grow">${esc(s.name)}</span></h3>
    <div class="kv"><div><small>Horario</small><b class="num">${esc(s.window)}</b></div><div><small>Aplica en</small><b>${esc(s.where)}</b></div><div class="full"><small>Regla</small><b>${esc(s.rule)}</b></div></div></section>`).join('')}</div>`;
};

PAGES.zonas = () => topbar('Zonas de riesgo', `${D.zones.length} zonas · ${counts().zone} unidades dentro`) +
  `<div class="list" style="margin-top:12px">${D.zones.map(z => {
    const inside = D.units.filter(u => u.zone === z.id);
    const tag = z.level === 'alto' ? `<span class="pr pr-crit">${svg('alert', 2.6)}RIESGO ALTO</span>` : `<span class="pr pr-med">${svg('diamond', 2.6)}RIESGO MEDIO</span>`;
    return `<section class="card opaque" style="margin:0"><h3>${ic('zone', 'c-zone')}<span class="grow">${z.id} · ${esc(z.name)}</span></h3>
      <div style="margin-bottom:10px">${tag}</div>
      <div class="kv"><div><small>Estado</small><b>${esc(z.state)}</b></div><div><small>Mayor riesgo</small><b class="num">${esc(z.window)}</b></div>
      <div class="full"><small>Tipo de riesgo</small><b>${esc(z.risk)}</b></div><div class="full"><small>Indicación</small><b>${esc(z.advice)}</b></div>
      <div class="full"><small>Unidades dentro ahora</small>${inside.length ? `<div class="units-mini">${inside.map(u => `<a href="#unidad-${u.id}">${u.id} · ${STATUS[u.status].label.toLowerCase()}</a>`).join('')}</div>` : '<b>Ninguna</b>'}</div></div></section>`;
  }).join('')}</div>`;

PAGES.bitacora = (tab) => {
  tab = tab === 'relevo' ? 'relevo' : 'bitacora';
  const sh = shift(), c = counts();
  const t = (k, l) => `<button role="tab" aria-selected="${tab === k}" data-a="go" data-to="${k === 'bitacora' ? 'bitacora' : 'bitacora-relevo'}">${l}</button>`;
  let body;
  if (tab === 'bitacora') {
    body = `<section class="card opaque"><h3>${ic('log', 'c-log')}Nueva entrada</h3>
      <form class="note" data-form="log" style="margin:0"><select id="log-cat" aria-label="Categoría"><option>Novedad</option><option>Llamada</option><option>Incidente</option><option>Relevo</option></select>
      <input id="log-text" placeholder="Qué pasó" aria-label="Texto de la entrada" autocomplete="off"><button type="submit">Agregar</button></form></section>
      ${searchBox('Buscar en la bitácora', 'log-search')}
      <section class="card opaque"><ol class="tl">${S.log.slice().sort((a, b) => b.t - a.t).map(e => `<li data-s="${esc((e.cat + ' ' + e.text).toLowerCase())}"><time class="num">${hhmm(e.t)}</time><span><span class="cat">${esc(e.cat)}</span>${esc(e.text)}</span></li>`).join('')}</ol></section>
      ${emptyBox('Sin entradas con ese texto.')}`;
  } else {
    const open = sortInc(incs().filter(i => i.status !== 'cerrada'));
    const done = S.handover.filter(Boolean).length;
    body = `<section class="banner b-ok"><div class="tags"><span class="pr pr-info">${svg('clock', 2.6)}RELEVO ${sh.next}</span><span class="num" style="font-size:12px;font-weight:600">${done} de ${D.handover.length} listos</span></div>
      <h2>Entrega del turno ${esc(sh.name)}</h2><div class="meta"><span>${c.open} incidentes abiertos</span><span>${c.signal} unidades sin señal</span></div></section>
      <section class="card opaque"><h3>${ic('check', 'c-rep')}Lista de entrega</h3><ul class="steps">${D.handover.map((h, k) => `<li><button role="checkbox" aria-checked="${!!S.handover[k]}" data-a="hstep" data-k="${k}"><span class="box">${svg('check', 3)}</span><span class="txt">${esc(h)}</span></button></li>`).join('')}</ul></section>
      ${secH('Pendientes que se entregan', open.length)}<div class="list">${open.map(incRow).join('') || '<div class="empty glass">Sin pendientes.</div>'}</div>
      <div class="actions"><button class="act primary" data-a="handover">${ic('send', 'c-log')}<span class="grow">Entregar turno<small>Comparte el resumen y lo registra en bitácora</small></span></button></div>`;
  }
  return topbar('Bitácora y relevo', `Turno ${sh.name.toLowerCase()} · relevo ${sh.next}`) + `<div class="tabs glass" role="tablist">${t('bitacora', 'Bitácora')}${t('relevo', 'Relevo')}</div>` + body;
};

function shiftSummary() {
  const all = incs(), c = counts(), sh = shift();
  const lines = [`Resumen del turno ${sh.name} · ${D.company.name}`, `Monitorista: ${D.user.name}`, `Fecha: ${new Date().toLocaleString('es-MX')}`, '',
    `Incidentes abiertos: ${c.open} (críticos: ${c.crit})`, `Cerrados: ${c.closed}`, `Unidades sin comunicación: ${c.signal}`, `Fuera de horario: ${c.horario}`, '', 'Abiertos:'];
  sortInc(all.filter(i => i.status !== 'cerrada')).forEach(i => lines.push(`- ${i.id} [${PR[i.pr][0]}] ${i.title} · ${i.unit} · ${INC_STATUS[i.status][0]}`));
  return lines.join('\n');
}

PAGES.reportes = () => {
  const all = incs(), c = counts();
  const byType = D.protocols.map(p => [p, all.filter(i => i.protocol === p.id).length]).filter(x => x[1]).sort((a, b) => b[1] - a[1]);
  return topbar('Reportes', `Turno ${shift().name.toLowerCase()}`) +
  `<section class="card opaque" style="margin-top:12px"><h3>${ic('rep', 'c-rep')}Resumen del turno</h3><div class="kv">
    <div><small>Incidentes</small><b class="num">${all.length}</b></div><div><small>Abiertos</small><b class="num">${c.open}</b></div>
    <div><small>Críticos abiertos</small><b class="num">${c.crit}</b></div><div><small>Cerrados</small><b class="num">${c.closed}</b></div>
    <div><small>Sin comunicación</small><b class="num">${c.signal} unidades</b></div><div><small>Fuera de horario</small><b class="num">${c.horario} viajes</b></div>
  </div></section>
  <section class="card opaque"><h3>${ic('proto', 'c-proto')}Incidentes por tipo</h3>
    ${byType.map(([p, n]) => `<div class="opt"><div class="grow"><b>${esc(p.name)}</b><span class="tel">${p.id}</span></div>${prTag(p.pr)}<b class="num" style="min-width:24px;text-align:right">${n}</b></div>`).join('')}
  </section>
  <div class="actions"><button class="act primary" data-a="sharesummary">${ic('send', 'c-rep')}<span class="grow">Compartir resumen del turno<small>Requiere confirmación</small></span></button></div>
  ${secH('Reportes anteriores', 'Ejemplo')}
  <div class="list">${D.pastReports.map(r => `<div class="unit glass">${ic('rep', 'c-rep')}<div class="grow"><div class="u">${esc(r[0])}</div><div class="m">${esc(r[1])}</div></div></div>`).join('')}</div>`;
};

PAGES.config = () => {
  const seg = (v, l) => `<button data-a="theme" data-v="${v}" aria-pressed="${S.settings.theme === v}">${l}</button>`;
  return topbar('Configuración', `${esc(D.user.name)} · ${esc(D.user.role)}`) +
  `<section class="card opaque" style="margin-top:12px"><h3>${ic('moon', 'c-cfg')}Apariencia</h3>
    <div class="tabs" style="background:var(--solid-2);margin:0 0 6px" role="group" aria-label="Tema">${seg('system', 'Sistema')}${seg('light', 'Claro')}${seg('dark', 'Nocturno')}</div>
    <div class="row"><span class="lbl">Texto más grande<small>Aumenta el tamaño de toda la app</small></span><button class="switch" role="switch" aria-checked="${S.settings.big}" aria-label="Texto más grande" data-a="big"></button></div>
    <div class="row"><span class="lbl">Reducir animaciones<small>También se respeta la opción del dispositivo</small></span><button class="switch" role="switch" aria-checked="${S.settings.rm}" aria-label="Reducir animaciones" data-a="rm"></button></div>
  </section>
  <section class="card opaque"><h3>${ic('download', 'c-unit')}Instalar en el teléfono</h3><div data-install-info></div></section>
  <section class="card opaque"><h3>${ic('user', 'c-log')}Perfil</h3><div class="kv"><div><small>Nombre</small><b>${esc(D.user.name)}</b></div><div><small>Rol</small><b>${esc(D.user.role)}</b></div><div><small>Turno</small><b>${esc(D.user.shift)}</b></div><div><small>Empresa</small><b>${esc(D.company.name)}</b></div></div></section>
  <section class="card opaque"><h3>${ic('info', 'c-cfg')}Modo demostración</h3>
    <p>Esta versión usa datos de ejemplo. No está conectada a GPS, a la base de datos ni a otros usuarios. Lo que registras se guarda solo en este teléfono.</p>
    <button class="btn" data-a="reset" style="background:var(--solid-2);color:var(--ink);border:1px solid var(--line-soft)">Restablecer datos de ejemplo</button>
  </section>
  <p style="text-align:center;color:var(--ink-3);font-size:12px;margin:18px 0 0">${esc(D.company.app)} · versión 1.0 demostración</p>`;
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
  if (page === 'unidades' && param && STATUS[param]) applyUnitFilter(param);
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
function applyUnitFilter(f) {
  view.querySelectorAll('[data-a="ufilter"]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.f === f)));
  filterList();
}
function filterList() {
  const inp = view.querySelector('[data-a="filter"]');
  const q = inp ? inp.value.trim().toLowerCase() : '';
  const fb = view.querySelector('[data-a="ufilter"][aria-pressed="true"]');
  const f = fb ? fb.dataset.f : 'todas';
  let n = 0, any = false;
  view.querySelectorAll('[data-s]').forEach(el => {
    any = true;
    const hide = (q && !el.dataset.s.includes(q)) || (f !== 'todas' && el.dataset.st && el.dataset.st !== f);
    el.hidden = !!hide; if (!hide) n++;
  });
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
  else if (a === 'toggle') {
    if (isTablet() && !app.classList.contains('menu-open')) { location.hash = 'alertas'; return; }
    subOpen = !subOpen; b.setAttribute('aria-expanded', String(subOpen)); b.nextElementSibling.classList.toggle('open', subOpen);
  }
  else if (a === 'sos') {
    openSheet(`<h3>Emergencias</h3><p>Elige a quién llamar. La llamada empieza solo al tocar <b>Llamar</b>.</p>
      ${D.contacts.slice(0, 2).concat(D.contacts.filter(c => !c.public)).slice(0, 4).map(c => `<div class="opt">${ic(c.icon, 'c-sos')}<div class="grow"><b>${esc(c.name)}</b><span class="tel">${esc(c.number)}</span></div><button class="call" data-a="dialnow" data-name="${esc(c.name)}" data-num="${esc(c.number)}">Llamar</button></div>`).join('')}
      <a class="link" href="#emergencias">Ver todos los contactos ${svg('chev')}</a>`);
  }
  else if (a === 'dial') {
    openSheet(`<h3>¿Llamar a ${esc(b.dataset.name)}?</h3><p>Se abrirá el marcador del teléfono y la llamada quedará anotada en la bitácora.</p>
      <div class="opt">${ic('phone', 'c-rep')}<div class="grow"><b>${esc(b.dataset.name)}</b><span class="tel">${esc(b.dataset.num)}</span></div><button class="call" data-a="dialnow" data-name="${esc(b.dataset.name)}" data-num="${esc(b.dataset.num)}">Llamar</button></div>`);
  }
  else if (a === 'dialnow') {
    const num = b.dataset.num.replace(/[^\d+]/g, '');
    addLog('Llamada', `${me()} abrió el marcador para llamar a ${b.dataset.name} (${b.dataset.num}).`);
    closeSheet();
    location.href = 'tel:' + num;
    toast(`Abriendo el marcador: ${b.dataset.num}. Si no se abre, márcalo a mano.`);
    if (current === 'bitacora') refresh();
  }
  else if (a === 'report') {
    const i = inc(b.dataset.inc), u = unit(i.unit);
    const text = `Reporte ${i.id} · ${D.company.name}\nPrioridad: ${PR[i.pr][0]}\n${i.title}\nUnidad ${u.id} · placa ${u.plate} · operador ${u.driver}\nRuta: ${u.route}\nÚltima posición: ${u.pos}\nEstado: ${INC_STATUS[i.status][0]}\nAbierto: ${hhmm(i.opened)}`;
    openSheet(`<h3>¿Enviar reporte?</h3><p>Se abrirá la opción de compartir del teléfono para que elijas a quién enviarlo (WhatsApp, correo, etc.).</p>
      <textarea class="field" readonly rows="7" aria-label="Texto del reporte">${esc(text)}</textarea>
      <div class="opt" style="border:0"><div class="grow"><b>Cliente y base de origen</b><span class="tel">Tú eliges el destinatario</span></div><button class="call neutral" data-a="sendnow">Enviar</button></div>`,
      async () => {
        const r = await shareText(`Reporte ${i.id}`, text);
        if (r === 'cancel') return;
        S.inc[i.id].notes.push({ t: Date.now(), text: `${me()} compartió el reporte del incidente.` }); addLog('Incidente', `Reporte de ${i.id} compartido.`);
        closeSheet(); refresh(); r === 'manual' ? showManual(text) : toast(shareMsg[r]);
      });
  }
  else if (a === 'sendnow') { if (sheetCb) await sheetCb(); }
  else if (a === 'take') {
    const s = S.inc[b.dataset.inc]; s.status = 'atencion'; s.owner = D.user.name;
    s.notes.push({ t: Date.now(), text: `${me()} tomó el incidente.` }); addLog('Incidente', `${me()} tomó ${b.dataset.inc}.`);
    save(); refresh(); toast('Incidente asignado a ti.');
  }
  else if (a === 'closeinc') {
    const id = b.dataset.inc;
    openSheet(`<h3>Cerrar ${id}</h3><p>Escribe cómo se resolvió. La nota queda en la bitácora.</p>
      <textarea class="field" id="close-note" rows="4" placeholder="Ejemplo: operador contestó, falla de señal en zona sin cobertura."></textarea>
      <div class="opt" style="border:0"><div class="grow"></div><button class="call neutral" data-a="sendnow">Cerrar incidente</button></div>`,
      async () => {
        const note = sheetEl.querySelector('#close-note').value.trim();
        if (!note) { toast('Escribe la nota de cierre para continuar.'); sheetEl.querySelector('#close-note').focus(); return; }
        const s = S.inc[id]; s.status = 'cerrada'; s.closedNote = note; s.owner = s.owner || D.user.name;
        s.notes.push({ t: Date.now(), text: `Cerrado por ${me()}.` }); addLog('Incidente', `${id} cerrado: ${note}`);
        save(); closeSheet(); refresh(); toast('Incidente cerrado.');
      });
  }
  else if (a === 'step') { const s = S.inc[b.dataset.inc]; const k = +b.dataset.k; s.steps[k] = !s.steps[k]; b.setAttribute('aria-checked', String(!!s.steps[k])); save(); }
  else if (a === 'hstep') { const k = +b.dataset.k; S.handover[k] = !S.handover[k]; save(); refresh(); }
  else if (a === 'handover') {
    const text = shiftSummary();
    openSheet(`<h3>¿Entregar turno?</h3><p>Comparte el resumen con quien recibe el turno. Se anotará en la bitácora.</p>
      <textarea class="field" readonly rows="8" aria-label="Resumen del turno">${esc(text)}</textarea>
      <div class="opt" style="border:0"><div class="grow">${S.handover.every(Boolean) ? '' : '<span class="pr pr-high">' + svg('excl', 2.6) + 'Lista incompleta</span>'}</div><button class="call neutral" data-a="sendnow">Entregar</button></div>`,
      async () => {
        const r = await shareText('Relevo de turno', text);
        if (r === 'cancel') return;
        addLog('Relevo', `${me()} entregó el turno ${shift().name}.`); closeSheet(); refresh();
        r === 'manual' ? showManual(text) : toast(shareMsg[r]);
      });
  }
  else if (a === 'sharesummary') {
    const text = shiftSummary();
    openSheet(`<h3>¿Compartir resumen?</h3><p>Elige a quién enviarlo en el siguiente paso.</p><textarea class="field" readonly rows="8" aria-label="Resumen del turno">${esc(text)}</textarea>
      <div class="opt" style="border:0"><div class="grow"></div><button class="call neutral" data-a="sendnow">Compartir</button></div>`,
      async () => { const r = await shareText('Resumen del turno', text); if (r === 'cancel') return; closeSheet(); r === 'manual' ? showManual(text) : toast(shareMsg[r]); });
  }
  else if (a === 'ufilter') applyUnitFilter(b.dataset.f);
  else if (a === 'night') setTheme(isDark() ? 'light' : 'dark');
  else if (a === 'theme') setTheme(b.dataset.v);
  else if (a === 'big') { S.settings.big = !S.settings.big; save(); applySettings(); refresh(); }
  else if (a === 'rm') { S.settings.rm = !S.settings.rm; save(); applySettings(); refresh(); }
  else if (a === 'reset') {
    openSheet(`<h3>¿Restablecer datos de ejemplo?</h3><p>Se borran las notas, cierres y entradas de bitácora que hiciste en este teléfono.</p>
      <div class="opt" style="border:0"><div class="grow"></div><button class="call" data-a="sendnow">Restablecer</button></div>`,
      async () => { const st = S.settings; S = freshState(); S.settings = st; save(); closeSheet(); location.hash = 'inicio'; render(); toast('Datos de ejemplo restablecidos.'); });
  }
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
app.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target, kind = f.dataset.form;
  if (kind === 'incnote') {
    const inp = f.querySelector('input'), v = inp.value.trim(); if (!v) return;
    S.inc[f.dataset.inc].notes.push({ t: Date.now(), text: `${me()}: ${v}` }); addLog('Incidente', `${f.dataset.inc}: ${v}`);
    save(); refresh(); toast('Nota agregada.');
  } else if (kind === 'log') {
    const v = f.querySelector('#log-text').value.trim(); if (!v) return;
    addLog(f.querySelector('#log-cat').value, `${me()}: ${v}`); refresh(); toast('Entrada agregada a la bitácora.');
  }
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
  const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = isDark() ? '#1d1814' : '#ddd3c7';
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
    ? `<div class="install glass">${ic('download', 'c-unit')}<div class="grow"><b style="font-size:13.5px">Instala Centinela</b><div style="font-size:11.5px;color:var(--ink-3)">${deferredPrompt ? 'Ábrela como app desde tu pantalla de inicio.' : 'En Safari: Compartir → Agregar a inicio.'}</div></div>${deferredPrompt ? '<button class="btn" data-a="install">Instalar</button>' : ''}<button class="btn-ic" data-a="dismissinstall" aria-label="Ocultar aviso" style="width:40px;height:40px">${svg('x')}</button></div>`
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
