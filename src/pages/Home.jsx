import { Link } from 'react-router-dom'
import peugeotLogo from '../assets/peugeot-clear.png'
import chevroletLogo from '../assets/chevrolet-clear.png'
import peugeotHero from '../assets/3008Main.png'
import chevroletHero from '../assets/tracker.png'

export default function Home() {
  return (
    <section
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(36px,7vw,84px) 20px clamp(48px,7vw,96px)',
        animation: 'afRise 520ms cubic-bezier(.2,.7,.2,1) both',
      }}
    >
      <p
        style={{
          fontFamily: 'Archivo, sans-serif',
          fontSize: 11,
          letterSpacing: '.24em',
          textTransform: 'uppercase',
          color: 'rgba(18,16,15,.45)',
          margin: '0 0 18px',
        }}
      >
        Concesionario oficial
      </p>
      <h1
        style={{
          fontFamily: 'Archivo, sans-serif',
          fontWeight: 600,
          fontSize: 'clamp(30px,5.2vw,60px)',
          lineHeight: 1.02,
          letterSpacing: '-.03em',
          margin: 0,
          maxWidth: '15ch',
          textWrap: 'balance',
        }}
      >
        Elige la marca que quieres conocer
      </h1>
      <p
        style={{
          margin: '20px 0 0',
          fontSize: 'clamp(15px,1.5vw,18px)',
          lineHeight: 1.5,
          color: 'rgba(18,16,15,.58)',
          maxWidth: '46ch',
        }}
      >
        Información de precios y versiones, o una visita agendada a nuestro showroom.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 16,
          marginTop: 'clamp(28px,4vw,48px)',
        }}
      >
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 4,
            background: '#0C0C0D',
            minHeight: 'clamp(400px,48vh,540px)',
            color: '#F2F1EF',
          }}
        >
          <img
            src={peugeotHero}
            alt="Peugeot 3008"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '30%',
              background: 'linear-gradient(180deg,rgba(6,6,7,0) 0%,#0C0C0D 74%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'absolute', top: 22, left: 22, background: '#fff', padding: '10px 12px', borderRadius: 2, pointerEvents: 'none' }}>
            <img src={peugeotLogo} alt="Peugeot" style={{ height: 44, width: 'auto', display: 'block' }} />
          </div>
          <Link
            to="/peugeot"
            className="af-hover-fade"
            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 22, color: '#F2F1EF' }}
          >
            <p style={{ margin: '0 0 8px', fontFamily: 'Archivo, sans-serif', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(242,241,239,.66)' }}>
              Peugeot 2008 &middot; Peugeot 3008
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
              <h2 style={{ margin: 0, fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 'clamp(26px,3.4vw,38px)', letterSpacing: '-.03em', lineHeight: 1 }}>
                Peugeot
              </h2>
              <span style={{ fontFamily: 'Archivo, sans-serif', fontSize: 13, letterSpacing: '.02em', paddingBottom: 4 }}>Ver marca &rarr;</span>
            </div>
          </Link>
        </div>

        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 4,
            background: '#E7E7E9',
            minHeight: 'clamp(400px,48vh,540px)',
            color: '#16181B',
          }}
        >
          <img
            src={chevroletHero}
            alt="Chevrolet Tracker"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '30%',
              background: 'linear-gradient(180deg,rgba(20,22,25,0) 0%,#16181B 74%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'absolute', top: 22, left: 22, background: '#fff', padding: '12px 14px', borderRadius: 2, pointerEvents: 'none' }}>
            <img src={chevroletLogo} alt="Chevrolet" style={{ height: 36, width: 'auto', display: 'block' }} />
          </div>
          <Link
            to="/chevrolet"
            className="af-hover-fade"
            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 22, color: '#F5F5F6' }}
          >
            <p style={{ margin: '0 0 8px', fontFamily: 'Archivo, sans-serif', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(245,245,246,.72)' }}>
              Chevrolet Tracker &middot; Chevrolet Montana
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
              <h2 style={{ margin: 0, fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 'clamp(26px,3.4vw,38px)', letterSpacing: '-.03em', lineHeight: 1 }}>
                Chevrolet
              </h2>
              <span style={{ fontFamily: 'Archivo, sans-serif', fontSize: 13, letterSpacing: '.02em', paddingBottom: 4 }}>Ver marca &rarr;</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
