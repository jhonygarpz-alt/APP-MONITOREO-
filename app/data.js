/* Datos de ejemplo para el modo demostración.
   Reemplazar por la conexión a la plataforma de rastreo y a la base de datos real.
   Los tiempos están en minutos antes de abrir la app ("hace N min"). */
window.DATA = {
  company: { app: 'Centinela', name: 'Transportes Ejemplo' },
  user: { name: 'Mariana Ruiz', initials: 'MR', role: 'Monitorista', shift: 'Turno B' },

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
    { name: 'Cabina de monitoreo', number: '812 603 9557', note: 'Cabina interna', icon: 'headset' },
    { name: 'Quálitas · siniestros', number: '800 800 2880', note: 'Reporte de siniestros, todo el país', icon: 'shield' },
    { name: 'Gerente de operaciones', number: '720 476 5054', note: 'Número directo', icon: 'user' }
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
  ]
};
