import { Link, Navigate } from 'react-router-dom'
import { useFlow } from '../App.jsx'
import infoImg from '../assets/info.png'
import visitImg from '../assets/visit.png'

export default function Intent() {
  const { brand, brandKey, theme } = useFlow()
  if (!brand) return <Navigate to="/" replace />

  const serviceUrl = 'https://sites.google.com/view/autofranciacochabamba?usp=sharing'

  const items = [
    {
      num: '01',
      title: 'Quiero información',
      sub: 'Conoce precios, versiones y disponibilidad.',
      cta: 'Pedir información',
      href: `/${brandKey}/info`,
      hint: `${brand.models[0].name} — exterior`,
      image: infoImg,
    },
    {
      num: '02',
      title: 'Quiero agendar una visita',
      sub: 'Elige el día y la hora para visitar nuestro showroom.',
      cta: 'Elegir día y hora',
      href: `/${brandKey}/schedule`,
      hint: `${brand.models[1].name} — showroom`,
      image: visitImg,
    },
  ]

  return (
    <section
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(32px,6vw,72px) 20px clamp(48px,7vw,90px)',
        animation: 'afRise 480ms cubic-bezier(.2,.7,.2,1) both',
      }}
    >
      <Link to="/" style={{ display: 'inline-block', fontFamily: 'Archivo, sans-serif', fontSize: 12, letterSpacing: '.06em', color: 'var(--af-mut,#6E6A65)', marginBottom: 26 }}>
        &larr; Volver
      </Link>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
        <div>
          <p style={{ fontFamily: 'Archivo, sans-serif', fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--af-mut,#6E6A65)', margin: '0 0 16px' }}>
            {brand.label}
          </p>
          <h1 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 'clamp(30px,5vw,58px)', lineHeight: 1.02, letterSpacing: '-.03em', margin: 0 }}>
            ¿Qué deseas hacer?
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: 'var(--af-mut,#6E6A65)', maxWidth: '32ch' }}>
          {brand.models.map((m) => m.name).join('  ·  ')}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginTop: 'clamp(26px,4vw,44px)' }}>
        {items.map((it) => {
          return (
            <div
              key={it.num}
              style={{ position: 'relative', overflow: 'hidden', borderRadius: 4, minHeight: 'clamp(340px,42vh,440px)', background: '#000' }}
            >
              <img
                src={it.image}
                alt={it.hint}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,.85) 100%)',
                }}
              />
              <Link
                to={it.href}
                className="af-hover-fade"
                style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', padding: 24, color: '#fff' }}
              >
                <span style={{ fontFamily: 'Archivo, sans-serif', fontSize: 11, letterSpacing: '.22em', marginBottom: 14, opacity: 0.75, textShadow: '0 1px 3px rgba(0,0,0,.6)' }}>{it.num}</span>
                <h2 style={{ margin: '0 0 8px', fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 'clamp(22px,2.6vw,30px)', letterSpacing: '-.02em', lineHeight: 1.1, textShadow: '0 1px 4px rgba(0,0,0,.6)' }}>
                  {it.title}
                </h2>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, maxWidth: '34ch', opacity: 0.92, textShadow: '0 1px 3px rgba(0,0,0,.6)' }}>{it.sub}</p>
                <span style={{ marginTop: 18, fontFamily: 'Archivo, sans-serif', fontSize: 13, letterSpacing: '.02em', textShadow: '0 1px 3px rgba(0,0,0,.6)' }}>{it.cta} &rarr;</span>
              </Link>
            </div>
          )
        })}
      </div>

      <a
        href={serviceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="af-hover-fade"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 18,
          marginTop: 18,
          padding: '18px 20px',
          border: '1px solid var(--af-line, rgba(18,16,15,.16))',
          borderRadius: 4,
          background: theme.surface,
          color: theme.ink,
        }}
      >
        <span>
          <strong style={{ display: 'block', fontFamily: 'Archivo, sans-serif', fontSize: 16 }}>Servicio técnico Auto Francia</strong>
          <span style={{ display: 'block', marginTop: 4, fontSize: 13, color: 'var(--af-mut, #6E6A65)' }}>Conoce nuestro servicio de postventa y repuestos.</span>
        </span>
        <span style={{ flex: '0 0 auto', fontFamily: 'Archivo, sans-serif', fontSize: 13 }}>Ver información ↗</span>
      </a>
    </section>
  )
}
