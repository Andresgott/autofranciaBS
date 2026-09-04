import { COUNTRIES } from '../lib/theme.js'

const labelStyle = {
  display: 'block',
  fontFamily: 'Archivo, sans-serif',
  fontSize: 11,
  letterSpacing: '.2em',
  textTransform: 'uppercase',
  color: 'var(--af-mut, #6E6A65)',
  marginBottom: 10,
}

const inputStyle = {
  width: '100%',
  height: 56,
  padding: '0 16px',
  border: '1px solid var(--af-line, rgba(18,16,15,.16))',
  borderRadius: 3,
  background: 'var(--af-surface, #fff)',
  fontSize: 16,
  outline: 'none',
}

export default function LeadForm({ name, onName, dial, onDial, phone, onPhone }) {
  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <label style={{ display: 'block' }}>
        <span style={labelStyle}>Nombre completo</span>
        <input
          type="text"
          className="af-input"
          value={name}
          onChange={(e) => onName(e.target.value)}
          placeholder="Ej. María Fernanda Rojas"
          autoComplete="name"
          style={inputStyle}
        />
      </label>
      <div>
        <span style={labelStyle}>Celular</span>
        <div style={{ display: 'flex', gap: 10 }}>
          <select
            value={dial}
            onChange={(e) => onDial(e.target.value)}
            aria-label="Código de país"
            style={{
              flex: '0 0 auto',
              width: 132,
              height: 56,
              padding: '0 10px',
              border: '1px solid var(--af-line, rgba(18,16,15,.16))',
              borderRadius: 3,
              background: 'var(--af-surface, #fff)',
              fontSize: 15,
              outline: 'none',
            }}
          >
            {COUNTRIES.map((c) => (
              <option key={c.dial} value={c.dial}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            type="tel"
            inputMode="numeric"
            className="af-input"
            value={phone}
            onChange={(e) => onPhone(e.target.value.replace(/[^\d\s]/g, ''))}
            placeholder="70000000"
            autoComplete="tel-national"
            style={{ flex: '1 1 auto', minWidth: 0, ...inputStyle }}
          />
        </div>
      </div>
    </div>
  )
}
