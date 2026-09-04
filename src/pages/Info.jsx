import { Link, Navigate } from 'react-router-dom'
import { useFlow } from '../App.jsx'
import ModelPicker from '../components/ModelPicker.jsx'
import LeadForm from '../components/LeadForm.jsx'
import CtaButton from '../components/CtaButton.jsx'
import { missingHint } from '../lib/theme.js'

export default function Info() {
  const { brand, brandKey, theme, model, setModel, name, setName, dial, setDial, phone, setPhone, valid, submit } = useFlow()
  if (!brand) return <Navigate to="/" replace />

  const hint = missingHint({ model, intent: 'info', time: true, valid, dial, phone })

  return (
    <section style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(28px,5vw,60px) 20px 110px', animation: 'afRise 460ms cubic-bezier(.2,.7,.2,1) both' }}>
      <Link
        to={`/${brandKey}`}
        style={{ display: 'inline-block', fontFamily: 'Archivo, sans-serif', fontSize: 12, letterSpacing: '.06em', color: 'var(--af-mut,#6E6A65)', marginBottom: 24 }}
      >
        &larr; Volver
      </Link>
      <p style={{ fontFamily: 'Archivo, sans-serif', fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--af-mut,#6E6A65)', margin: '0 0 14px' }}>
        {brand.label} &middot; Información
      </p>
      <h1 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 'clamp(27px,4vw,44px)', lineHeight: 1.05, letterSpacing: '-.03em', margin: '0 0 8px' }}>
        Precios, versiones y disponibilidad
      </h1>
      <p style={{ margin: '0 0 clamp(26px,4vw,40px)', fontSize: 15, lineHeight: 1.55, color: 'var(--af-mut,#6E6A65)', maxWidth: '44ch' }}>
        Un asesor te responde por WhatsApp con la información del modelo que elijas.
      </p>

      <p style={{ fontFamily: 'Archivo, sans-serif', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--af-mut,#6E6A65)', margin: '0 0 14px' }}>
        Selecciona el modelo
      </p>
      <ModelPicker models={brand.models} selected={model} onSelect={setModel} theme={theme} />

      <div style={{ height: 1, background: 'var(--af-line,rgba(18,16,15,.12))', margin: 'clamp(28px,4vw,42px) 0' }} />

      <LeadForm name={name} onName={setName} dial={dial} onDial={setDial} phone={phone} onPhone={setPhone} />

      <CtaButton label="Solicitar información por WhatsApp" hint={hint} ok={valid} onClick={submit} />
    </section>
  )
}
