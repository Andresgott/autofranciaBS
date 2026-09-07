import ImagePlaceholder from './ImagePlaceholder.jsx'
import { selectableStyle } from '../lib/theme.js'
import img2008 from '../assets/2008.png'
import img3008 from '../assets/3008Main.png'
import imgTracker from '../assets/tracker.png'
import imgMontana from '../assets/montana.png'
import imgOnix from '../assets/onix.png'

const MODEL_IMAGES = {
  '2008': img2008,
  '3008': img3008,
  tracker: imgTracker,
  montana: imgMontana,
  onix: imgOnix,
}

export default function ModelPicker({ models, selected, onSelect, theme }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
      {models.map((m) => {
        const isSelected = selected === m.id
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.id)}
            style={{ ...selectableStyle(theme, isSelected), font: 'inherit' }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 10',
                overflow: 'hidden',
                borderRadius: 3,
                background: 'rgba(128,128,128,.10)',
              }}
            >
              {MODEL_IMAGES[m.id] ? (
                <img
                  src={MODEL_IMAGES[m.id]}
                  alt={m.name}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <ImagePlaceholder caption={m.name} tone={theme.bg === '#0C0C0D' ? 'dark' : 'light'} />
              )}
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                padding: '14px 4px 4px',
                color: theme.ink,
              }}
            >
              <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 16, letterSpacing: '-.01em' }}>
                {m.name}
              </span>
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  flex: '0 0 auto',
                  border: '1px solid ' + (isSelected ? theme.ink : theme.line),
                  background: isSelected ? theme.ink : 'transparent',
                  boxShadow: isSelected ? 'inset 0 0 0 3px ' + theme.surface : 'none',
                }}
              />
            </div>
          </button>
        )
      })}
    </div>
  )
}
