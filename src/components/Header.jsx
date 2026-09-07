import { Link } from 'react-router-dom'
import autofranciaLogo from '../assets/autofrancia-clear.png'
import peugeotLogo from '../assets/peugeot-clear.png'
import chevroletLogo from '../assets/chevrolet-clear.png'

const MAPS_URL = 'https://maps.app.goo.gl/4AHTHJz47V8kMF446'
const CORPORATE_PHONE = '71741577'

export default function Header({ brand }) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(255,255,255,.66)',
        borderBottom: '1px solid rgba(255,255,255,.72)',
        boxShadow: '0 8px 28px rgba(18,16,15,.08)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '16px 20px 14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 'clamp(14px,3vw,26px)',
          }}
        >
          <Link to="/" aria-label="AutoFrancia SRL" style={{ display: 'block' }}>
            <img src={autofranciaLogo} alt="AutoFrancia SRL" style={{ height: 'clamp(42px,6.4vw,60px)', width: 'auto', display: 'block' }} />
          </Link>
          {brand && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px,3vw,24px)' }}>
              <span style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16, color: 'rgba(18,16,15,.28)' }}>+</span>
              {brand === 'peugeot' && (
                <img src={peugeotLogo} alt="Peugeot" style={{ height: 'clamp(34px,4.6vw,46px)', width: 'auto', display: 'block' }} />
              )}
              {brand === 'chevrolet' && (
                <img src={chevroletLogo} alt="Chevrolet" style={{ height: 'clamp(26px,3.4vw,34px)', width: 'auto', display: 'block' }} />
              )}
            </div>
          )}
        </div>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener"
          className="af-link-hover"
          style={{
            fontFamily: 'Archivo, sans-serif',
            fontSize: 10,
            letterSpacing: '.16em',
            textTransform: 'uppercase',
            color: 'rgba(18,16,15,.5)',
            textAlign: 'center',
            borderBottom: '1px solid rgba(18,16,15,.18)',
            paddingBottom: 2,
          }}
        >
          Showroom Cochabamba &middot; Av. Beijing esq. Jes&uacute;s Aguayo ↗
        </a>
        <a
          href={`tel:+591${CORPORATE_PHONE}`}
          className="af-link-hover"
          style={{ fontFamily: 'Archivo, sans-serif', fontSize: 11, letterSpacing: '.08em', color: 'rgba(18,16,15,.62)' }}
        >
          Corporativo: +591 {CORPORATE_PHONE}
        </a>
      </div>
    </header>
  )
}
