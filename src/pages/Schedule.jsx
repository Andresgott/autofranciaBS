import { Link, Navigate } from 'react-router-dom'
import { useFlow } from '../App.jsx'
import ModelPicker from '../components/ModelPicker.jsx'
import LeadForm from '../components/LeadForm.jsx'
import CtaButton from '../components/CtaButton.jsx'
import { DOW, MON, parseDate, dateStyle, pillStyle, missingHint } from '../lib/theme.js'

export default function Schedule() {
  const {
    brand,
    brandKey,
    theme,
    model,
    setModel,
    date,
    setDate,
    time,
    setTime,
    name,
    setName,
    dial,
    setDial,
    phone,
    setPhone,
    valid,
    submit,
    modelName,
    summaryDate,
    availability,
    loadingAvail,
    availError,
    loadAvailability,
  } = useFlow()

  if (!brand) return <Navigate to="/" replace />

  const slots = availability && date ? (availability.find((d) => d.date === date) || {}).slots || [] : null
  const slotsAM = (slots || []).filter((x) => Number(x.split(':')[0]) < 12)
  const slotsPM = (slots || []).filter((x) => Number(x.split(':')[0]) >= 12)
  const showDates = !loadingAvail && !availError && (availability || []).length > 0
  const noDatesAtAll = !loadingAvail && !availError && availability !== null && availability.length === 0
  const hasDate = !!date && !loadingAvail
  const noSlots = !!date && slots !== null && slots.length === 0
  const showSummary = !!(model && date && time)
  const hint = missingHint({ model, intent: 'schedule', time, valid, dial, phone })

  return (
    <section style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(28px,5vw,60px) 20px 110px', animation: 'afRise 460ms cubic-bezier(.2,.7,.2,1) both' }}>
      <Link
        to={`/${brandKey}`}
        style={{ display: 'inline-block', fontFamily: 'Archivo, sans-serif', fontSize: 12, letterSpacing: '.06em', color: 'var(--af-mut,#6E6A65)', marginBottom: 24 }}
      >
        &larr; Volver
      </Link>
      <p style={{ fontFamily: 'Archivo, sans-serif', fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--af-mut,#6E6A65)', margin: '0 0 14px' }}>
        {brand.label} &middot; Visita al showroom
      </p>
      <h1 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 'clamp(27px,4vw,44px)', lineHeight: 1.05, letterSpacing: '-.03em', margin: '0 0 8px' }}>
        Agenda tu visita
      </h1>
      <p style={{ margin: '0 0 clamp(26px,4vw,44px)', fontSize: 15, lineHeight: 1.55, color: 'var(--af-mut,#6E6A65)', maxWidth: '44ch' }}>
        Elige modelo, día y hora. Te esperamos con el vehículo listo para prueba.
      </p>

      <StepLabel n="01" text="Modelo" />
      <ModelPicker models={brand.models} selected={model} onSelect={setModel} theme={theme} />

      <div style={{ height: 1, background: 'var(--af-line,rgba(18,16,15,.12))', margin: 'clamp(28px,4vw,40px) 0' }} />

      <StepLabel n="02" text="Fecha" />

      {loadingAvail && (
        <>
          <div style={{ display: 'flex', gap: 10, overflow: 'hidden' }}>
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div key={s} style={{ flex: '0 0 auto', width: 78, height: 96, borderRadius: 3, background: 'rgba(128,128,128,.16)', animation: 'afPulse 1.4s ease-in-out infinite' }} />
            ))}
          </div>
          <p style={{ margin: '14px 0 0', fontSize: 13, color: 'var(--af-mut,#6E6A65)' }}>Consultando disponibilidad del showroom…</p>
        </>
      )}

      {showDates && (
        <div className="af-rail" style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 10, scrollSnapType: 'x proximity', WebkitOverflowScrolling: 'touch' }}>
          {availability.map((d) => {
            const dt = parseDate(d.date)
            const selected = date === d.date
            return (
              <button
                key={d.date}
                type="button"
                onClick={() => setDate(d.date)}
                style={dateStyle(theme, selected)}
              >
                <span style={{ fontFamily: 'Archivo, sans-serif', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', opacity: 0.62 }}>{DOW[dt.getDay()]}</span>
                <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 26, lineHeight: 1, letterSpacing: '-.02em' }}>
                  {String(dt.getDate()).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: 'Archivo, sans-serif', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', opacity: 0.62 }}>{MON[dt.getMonth()]}</span>
              </button>
            )
          })}
        </div>
      )}

      {availError && (
        <div style={{ border: '1px solid var(--af-line,rgba(18,16,15,.16))', borderRadius: 3, padding: 22 }}>
          <p style={{ margin: '0 0 6px', fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 16 }}>No pudimos cargar los horarios.</p>
          <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--af-mut,#6E6A65)' }}>Intenta nuevamente.</p>
          <button
            type="button"
            onClick={loadAvailability}
            style={{ height: 44, padding: '0 20px', border: '1px solid var(--af-ink,#12100F)', background: 'transparent', borderRadius: 3, fontFamily: 'Archivo, sans-serif', fontSize: 14, cursor: 'pointer' }}
          >
            Reintentar
          </button>
        </div>
      )}

      {noDatesAtAll && (
        <div style={{ border: '1px dashed var(--af-line,rgba(18,16,15,.2))', borderRadius: 3, padding: 24 }}>
          <p style={{ margin: 0, fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 16 }}>No encontramos horarios disponibles.</p>
        </div>
      )}

      {hasDate && (
        <div>
          <StepLabel n="03" text="Hora" style={{ margin: 'clamp(26px,4vw,38px) 0 14px' }} />

          {noSlots && (
            <div style={{ border: '1px dashed var(--af-line,rgba(18,16,15,.2))', borderRadius: 3, padding: 24 }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 16 }}>No encontramos horarios disponibles para esta fecha.</p>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--af-mut,#6E6A65)' }}>Elige otro día en el selector de arriba.</p>
            </div>
          )}

          {slotsAM.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <p style={{ margin: '0 0 10px', fontSize: 12, letterSpacing: '.04em', color: 'var(--af-mut,#6E6A65)' }}>Mañana</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {slotsAM.map((s) => (
                  <button key={s} type="button" onClick={() => setTime(s)} style={pillStyle(theme, time === s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {slotsPM.length > 0 && (
            <div>
              <p style={{ margin: '0 0 10px', fontSize: 12, letterSpacing: '.04em', color: 'var(--af-mut,#6E6A65)' }}>Tarde</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {slotsPM.map((s) => (
                  <button key={s} type="button" onClick={() => setTime(s)} style={pillStyle(theme, time === s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ height: 1, background: 'var(--af-line,rgba(18,16,15,.12))', margin: 'clamp(28px,4vw,40px) 0' }} />

      <StepLabel n="04" text="Tus datos" />
      <LeadForm name={name} onName={setName} dial={dial} onDial={setDial} phone={phone} onPhone={setPhone} />

      {showSummary && (
        <div style={{ marginTop: 'clamp(28px,4vw,40px)', border: '1px solid var(--af-line,rgba(18,16,15,.16))', borderRadius: 3, padding: 22, background: 'var(--af-surface,#fff)' }}>
          <p style={{ margin: '0 0 16px', fontFamily: 'Archivo, sans-serif', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--af-mut,#6E6A65)' }}>
            Tu visita
          </p>
          <p style={{ margin: '0 0 6px', fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 'clamp(20px,2.4vw,26px)', letterSpacing: '-.02em' }}>{modelName}</p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: 'var(--af-mut,#6E6A65)' }}>{summaryDate}</p>
          <p style={{ margin: '2px 0 0', fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 20 }}>{time || ''}</p>
        </div>
      )}

      <CtaButton label="Confirmar visita por WhatsApp" hint={hint} ok={valid} onClick={submit} />
    </section>
  )
}

function StepLabel({ n, text, style }) {
  return (
    <p
      style={{
        fontFamily: 'Archivo, sans-serif',
        fontSize: 11,
        letterSpacing: '.2em',
        textTransform: 'uppercase',
        color: 'var(--af-mut,#6E6A65)',
        margin: '0 0 14px',
        ...style,
      }}
    >
      <span style={{ opacity: 0.55, marginRight: 10 }}>{n}</span>
      {text}
    </p>
  )
}
