export const THEMES = {
  neutral: { bg: '#F4F3F0', ink: '#12100F', mut: '#6E6A65', line: 'rgba(18,16,15,.12)', surface: '#FFFFFF', accent: '#1B2A6B' },
  peugeot: { bg: '#0C0C0D', ink: '#F2F1EF', mut: '#93908C', line: 'rgba(242,241,239,.16)', surface: '#15151A', accent: '#2D6BE4' },
  chevrolet: { bg: '#EFEFF1', ink: '#16181B', mut: '#63676D', line: 'rgba(22,24,27,.14)', surface: '#FFFFFF', accent: '#C79A4B' },
}

export const BRANDS = {
  peugeot: {
    key: 'peugeot',
    label: 'Peugeot',
    api: 'PEUGEOT',
    models: [
      { id: '2008', name: 'Peugeot 2008' },
      { id: '3008', name: 'Peugeot 3008' },
    ],
  },
  chevrolet: {
    key: 'chevrolet',
    label: 'Chevrolet',
    api: 'CHEVROLET',
    models: [
      { id: 'tracker', name: 'Chevrolet Tracker' },
      { id: 'montana', name: 'Chevrolet Montana' },
    ],
  },
}

export const COUNTRIES = [
  { dial: '+591', label: '+591 BO' },
  { dial: '+54', label: '+54 AR' },
  { dial: '+55', label: '+55 BR' },
  { dial: '+56', label: '+56 CL' },
  { dial: '+51', label: '+51 PE' },
  { dial: '+595', label: '+595 PY' },
  { dial: '+34', label: '+34 ES' },
  { dial: '+1', label: '+1 US' },
]

export const DOW = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']
export const DOW_LONG = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
export const MON = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
export const MON_LONG = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

export function parseDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function formatLongDate(iso) {
  if (!iso) return ''
  const dt = parseDate(iso)
  const text = DOW_LONG[dt.getDay()] + ' ' + dt.getDate() + ' de ' + MON_LONG[dt.getMonth()]
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function missingHint({ model, intent, time, valid, dial, phone }) {
  if (!model) return 'Selecciona un modelo para continuar.'
  if (intent === 'schedule' && !time) return 'Selecciona una fecha y hora disponibles.'
  if (!valid) return 'Completa tu nombre y celular.'
  return `Te escribiremos por WhatsApp al ${dial} ${phone}.`
}

export function getTheme(brandKey) {
  return THEMES[brandKey] || THEMES.neutral
}

export function selectableStyle(theme, selected, extra) {
  return {
    textAlign: 'left',
    cursor: 'pointer',
    background: selected ? theme.surface : 'transparent',
    border: '1px solid ' + (selected ? theme.ink : theme.line),
    borderRadius: 4,
    padding: 10,
    transition: 'border-color 220ms ease, background 220ms ease, transform 220ms ease',
    color: theme.ink,
    boxShadow: selected ? 'inset 0 0 0 1px ' + theme.ink : 'none',
    display: 'block',
    width: '100%',
    ...extra,
  }
}

export function pillStyle(theme, selected) {
  return {
    minWidth: 88,
    height: 52,
    padding: '0 18px',
    cursor: 'pointer',
    borderRadius: 3,
    fontFamily: 'Archivo, sans-serif',
    fontSize: 16,
    letterSpacing: '.01em',
    background: selected ? theme.ink : 'transparent',
    color: selected ? theme.bg : theme.ink,
    border: '1px solid ' + (selected ? theme.ink : theme.line),
    transition: 'background 200ms ease, color 200ms ease, border-color 200ms ease',
  }
}

export function dateStyle(theme, selected) {
  return {
    flex: '0 0 auto',
    width: 82,
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    scrollSnapAlign: 'start',
    cursor: 'pointer',
    borderRadius: 3,
    background: selected ? theme.ink : 'transparent',
    color: selected ? theme.bg : theme.ink,
    border: '1px solid ' + (selected ? theme.ink : theme.line),
    transition: 'background 220ms ease, color 220ms ease, border-color 220ms ease',
  }
}
