/* Datos de ejemplo para el modo demostración.
   Reemplazar por la conexión a la plataforma de rastreo y a la base de datos real.
   Los tiempos están en minutos antes de abrir la app ("hace N min"). */
window.DATA = {
  company: { app: 'Centinela', name: 'Transportes Ejemplo' },
  user: { name: 'Mariana Ruiz', initials: 'MR', role: 'Monitorista', shift: 'Turno B' },

  /* Cada incidente trae los datos del vehículo involucrado tal como llegan en el reporte.
     La app no administra unidades: solo los muestra como referencia del incidente. */
  incidents: [
    { id: "INC-2611-0147", pr: "crit", title: "Sin comunicación y desvío de ruta de 1.2 km", status: "activa", openedMin: 6, protocol: "P-03", zone: "Z-01",
      v: { unit: "U-214", plate: "54-AK-7R", driver: "Ramón Ortiz", phone: "+52 444 000 0101", route: "Querétaro → Monterrey", client: "Cliente Norte", trip: "VJ-88310", cargo: "Carga seca", pos: "Carr. 57D, Km 87, San Luis Potosí", lat: 22.48, lng: -100.86, signalMin: 6, speed: 0 },
      events: [[6, "Incidente generado automáticamente."], [8, "Desvío de 1.2 km respecto a la ruta autorizada."], [10, "Última señal GPS recibida."]] },
    { id: "INC-2611-0146", pr: "crit", title: "Sin comunicación por más de 5 min en Arco Norte", status: "activa", openedMin: 3, protocol: "P-03", zone: "Z-02",
      v: { unit: "U-062", plate: "40-HK-8N", driver: "Iván Cárdenas", phone: "+52 55 0000 0106", route: "CDMX → Querétaro", client: "Cliente Centro", trip: "VJ-88312", cargo: "Farmacéutica", pos: "Arco Norte, Km 41, Hidalgo", lat: 19.98, lng: -99.33, signalMin: 7, speed: 0 },
      events: [[3, "Incidente generado automáticamente."], [7, "Última señal GPS recibida."]] },
    { id: "INC-2611-0145", pr: "high", title: "Viaje fuera de horario de circulación", status: "activa", openedMin: 14, protocol: "P-05",
      v: { unit: "U-087", plate: "31-BT-2M", driver: "Lucía Méndez", phone: "+52 222 000 0102", route: "CDMX → Puebla", client: "Cliente Centro", trip: "VJ-88297", cargo: "Abarrotes", pos: "Autopista 150D, Km 64, Edo. de México", lat: 19.33, lng: -98.83, signalMin: 0, speed: 82 },
      events: [[14, "La unidad sigue en ruta después de las 23:00."]] },
    { id: "INC-2611-0143", pr: "high", title: "Parada no programada de 25 min", status: "atencion", openedMin: 25, protocol: "P-04", owner: "Mariana Ruiz",
      v: { unit: "U-132", plate: "88-CF-5P", driver: "Héctor Salas", phone: "+52 477 000 0103", route: "León → Guadalajara", client: "Cliente Bajío", trip: "VJ-88305", cargo: "Autopartes", pos: "Carr. 80D, Km 31, Jalisco", lat: 21.19, lng: -102.33, signalMin: 1, speed: 0 },
      events: [[18, "Mariana R. tomó el incidente."], [25, "Unidad detenida fuera de parador autorizado."]] },
    { id: "INC-2611-0142", pr: "high", title: "Sin comunicación en Cumbres de Maltrata", status: "atencion", openedMin: 9, protocol: "P-03", owner: "Mariana Ruiz", zone: "Z-03",
      v: { unit: "U-201", plate: "66-GR-3T", driver: "Daniel Pineda", phone: "+52 229 000 0105", route: "Veracruz → Puebla", client: "Cliente Golfo", trip: "VJ-88301", cargo: "Granos", pos: "Carr. 150D, Km 228, Cumbres de Maltrata", lat: 18.81, lng: -97.27, signalMin: 9, speed: 0 },
      events: [[5, "Mariana R. tomó el incidente. Zona con mala cobertura."], [9, "Incidente generado automáticamente."]] },
    { id: "INC-2611-0141", pr: "high", title: "Viaje fuera de horario de circulación", status: "activa", openedMin: 20, protocol: "P-05",
      v: { unit: "U-158", plate: "27-JM-6Q", driver: "Patricia Luna", phone: "+52 33 0000 0107", route: "Guadalajara → Colima", client: "Cliente Pacífico", trip: "VJ-88299", cargo: "Refrigerado", pos: "Carr. 54D, Km 96, Jalisco", lat: 19.88, lng: -103.58, signalMin: 0, speed: 77 },
      events: [[20, "La unidad sigue en ruta después de las 23:00."]] },
    { id: "INC-2611-0140", pr: "med", title: "Ingreso a zona de riesgo, Km 112", status: "activa", openedMin: 33, protocol: "P-06", zone: "Z-01",
      v: { unit: "U-051", plate: "12-DN-9X", driver: "Sofía Rangel", phone: "+52 444 000 0104", route: "SLP → Saltillo", client: "Cliente Norte", trip: "VJ-88288", cargo: "Electrónicos", pos: "Carr. 57D, Km 112, San Luis Potosí", lat: 22.66, lng: -100.97, signalMin: 0, speed: 74 },
      events: [[33, "Ingreso a la zona Z-01."]] },
    { id: "INC-2611-0136", pr: "med", title: "Exceso de velocidad: 104 km/h", status: "cerrada", openedMin: 95, protocol: "P-07", closedNote: "Operador avisado por radio. Redujo velocidad.",
      v: { unit: "U-118", plate: "58-LS-7A", driver: "Gabriela Soto", phone: "+52 442 000 0111", route: "Querétaro → CDMX", client: "Cliente Centro", trip: "VJ-88307", cargo: "Abarrotes", pos: "Carr. 57D, Km 120, Hidalgo", lat: 20.21, lng: -99.72, signalMin: 0, speed: 91 },
      events: [[80, "Cerrado por Mariana R."], [95, "Velocidad sobre el límite de la empresa."]] },
    { id: "INC-2611-0131", pr: "high", title: "Parada no programada de 18 min", status: "cerrada", openedMin: 160, protocol: "P-04", closedNote: "Revisión de llanta. Operador confirmó por teléfono.",
      v: { unit: "U-009", plate: "73-EH-1K", driver: "Jorge Treviño", phone: "+52 722 000 0108", route: "Toluca → Morelia", client: "Cliente Occidente", trip: "VJ-88294", cargo: "Carga seca", pos: "Carr. 15D, Km 142, Michoacán", lat: 19.62, lng: -100.6, signalMin: 0, speed: 88 },
      events: [[140, "Cerrado por Mariana R."], [160, "Unidad detenida fuera de parador autorizado."]] },
    { id: "INC-2611-0128", pr: "crit", title: "Botón de pánico activado", status: "cerrada", openedMin: 210, protocol: "P-01", closedNote: "Activación accidental confirmada con palabra clave.",
      v: { unit: "U-176", plate: "05-FL-4S", driver: "Ana Beltrán", phone: "+52 229 000 0109", route: "Veracruz → CDMX", client: "Cliente Golfo", trip: "VJ-88302", cargo: "Contenedor", pos: "Carr. 150D, Km 180, Puebla", lat: 18.9, lng: -97.6, signalMin: 0, speed: 79 },
      events: [[204, "Cerrado por Mariana R."], [210, "Botón de pánico activado."]] }
  ],

  protocols: [
    { id: 'P-01', pr: 'crit', name: 'Botón de pánico o asalto', escalate: 'Inmediato', steps: [
      'Llamar al operador y pedir la palabra clave. Si no la da o no contesta, tratar como asalto.',
      'Llamar al 911 con la última posición, placa y descripción de la unidad.',
      'Avisar a la aseguradora y al gerente de operaciones.',
      'Mantener rastreo continuo y registrar cada posición en la bitácora.',
      'No contactar de nuevo al operador si hay riesgo de exponerlo.'] },
    { id: 'P-02', pr: 'crit', name: 'Accidente vial', escalate: 'Inmediato', steps: [
      'Confirmar con el operador si hay lesionados.',
      'Si hay lesionados, llamar al 911 de inmediato.',
      'Reportar el siniestro a la aseguradora con número de póliza.',
      'Avisar al cliente y a la base de origen.',
      'Registrar fotos y datos del ajustador en la bitácora.'] },
    { id: 'P-03', pr: 'crit', name: 'Pérdida de comunicación', escalate: '15 min sin contacto', steps: [
      'Intentar contacto con el operador por radio y celular.',
      'Verificar última posición y ruta autorizada.',
      'Avisar al cliente y a la base de origen.',
      'Si no hay contacto en 15 min, escalar a Emergencias.',
      'Registrar cada acción en la bitácora.'] },
    { id: 'P-04', pr: 'high', name: 'Parada no autorizada', escalate: '30 min', steps: [
      'Llamar al operador y confirmar el motivo de la parada.',
      'Si el motivo no es válido, indicar que reanude o se mueva a un parador autorizado.',
      'Si no contesta, aplicar P-03.',
      'Registrar el motivo en la bitácora.'] },
    { id: 'P-05', pr: 'high', name: 'Circulación fuera de horario', escalate: '20 min', steps: [
      'Confirmar si el viaje tiene autorización especial.',
      'Si no la tiene, indicar al operador el parador autorizado más cercano.',
      'Avisar al coordinador de tráfico.',
      'Registrar hora de parada en la bitácora.'] },
    { id: 'P-06', pr: 'med', name: 'Ingreso a zona de riesgo', escalate: 'Si se detiene', steps: [
      'Avisar al operador que entró a zona de riesgo y recordar no detenerse.',
      'Aumentar la frecuencia de revisión de posición.',
      'Si la unidad se detiene dentro de la zona, aplicar P-04 como prioridad crítica.'] },
    { id: 'P-07', pr: 'med', name: 'Exceso de velocidad', escalate: 'Si se repite', steps: [
      'Avisar al operador por radio.',
      'Si se repite en el mismo viaje, avisar al coordinador.',
      'Registrar en la bitácora.'] }
  ],

  contacts: [
    { name: '911 · Emergencias', number: '911', note: 'Policía, ambulancia y bomberos', icon: 'sos', public: true },
    { name: '088 · Guardia Nacional', number: '088', note: 'Seguridad en carreteras federales', icon: 'shield', public: true },
    { name: '089 · Denuncia anónima', number: '089', note: 'Reportes sin identificarse', icon: 'phone', public: true },
    { name: '078 · Ángeles Verdes', number: '078', note: 'Auxilio mecánico en carretera', icon: 'tool', public: true },
    { name: 'Cabina de monitoreo', number: '720 476 5054', note: 'Cabina interna', icon: 'headset' },
    { name: 'Quálitas · siniestros', number: '800 800 2880', note: 'Reporte de siniestros, todo el país', icon: 'shield' },
    { name: 'Gerente de operaciones', number: '+52 442 000 0001', note: 'Número de ejemplo', icon: 'user' }
  ],

  policies: [
    { id: 'POL-FL-2026-0081', insurer: 'Quálitas', type: 'Flotilla · cobertura amplia', from: '01 ene 2026', to: '31 dic 2026', deductible: '5 % daños materiales · 10 % robo total', phone: '800 800 2880' },
    { id: 'POL-MC-2025-0412', insurer: 'Quálitas', type: 'Mercancía en tránsito', from: '21 nov 2025', to: '21 nov 2026', deductible: '3 % del valor declarado', phone: '800 800 2880', expiresDays: 12 }
  ],

  schedules: [
    { name: 'Restricción nocturna de la empresa', where: 'Todas las rutas', window: '23:00 – 05:00', rule: 'No circular sin autorización especial. Esperar en parador autorizado.' },
    { name: 'Carga pesada en fin de semana', where: 'Autopista México – Puebla (ejemplo)', window: 'Domingo 15:00 – 22:00', rule: 'Unidades de más de 3.5 t no circulan en este tramo.' },
    { name: 'Doble remolque en zona urbana', where: 'Zona metropolitana (ejemplo)', window: '06:00 – 10:00 y 18:00 – 21:00', rule: 'Doble remolque sin acceso al periférico.' }
  ],

  zones: [
    { id: 'Z-01', level: 'alto', name: 'Carr. 57D, Km 80 – 120', state: 'San Luis Potosí', window: '20:00 – 06:00', risk: 'Robo a transporte de carga', advice: 'No detenerse. Circular en convoy si es posible. Revisar posición cada 5 min.' },
    { id: 'Z-02', level: 'alto', name: 'Arco Norte, Km 30 – 60', state: 'Hidalgo', window: '22:00 – 05:00', risk: 'Robo con bloqueo de carretera', advice: 'Evitar paradas. Reportar cualquier reducción de velocidad.' },
    { id: 'Z-03', level: 'medio', name: 'Cumbres de Maltrata', state: 'Veracruz – Puebla', window: 'Todo el día', risk: 'Niebla, pendientes y poca cobertura celular', advice: 'Pérdida de señal frecuente. Esperar 10 min antes de escalar.' },
    { id: 'Z-04', level: 'medio', name: 'Paradores sin vigilancia, Lagos de Moreno', state: 'Jalisco', window: '21:00 – 06:00', risk: 'Robo de combustible y mercancía', advice: 'Usar solo paradores autorizados.' }
  ],

  log: [
    [2, 'Llamada', 'Mariana R. intentó contacto por radio con el operador de INC-2611-0147. Sin respuesta.'],
    [18, 'Incidente', 'Mariana R. tomó INC-2611-0143.'],
    [45, 'Novedad', 'Cliente Norte pide aviso al cerrar INC-2611-0140.'],
    [80, 'Incidente', 'INC-2611-0136 cerrado: operador redujo velocidad.'],
    [204, 'Incidente', 'INC-2611-0128 cerrado: botón de pánico accidental.'],
    [230, 'Relevo', 'Inicio de turno nocturno B. Recibido de Turno A con 2 pendientes.']
  ],

  handover: [
    'Revisar con el siguiente turno cada incidente abierto',
    'Comunicar las unidades sin comunicación',
    'Anotar pendientes de clientes',
    'Cerrar o transferir llamadas en curso'
  ],

  pastReports: [
    ['Turno A · vespertino', '8 incidentes · 0 críticos'],
    ['Turno C · matutino', '5 incidentes · 1 crítico'],
    ['Turno B · nocturno (ayer)', '11 incidentes · 2 críticos']
  ]
};
