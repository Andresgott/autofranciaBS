export default function CtaButton({ label, hint, ok, onClick }) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        style={{
          width: '100%',
          height: 60,
          marginTop: 'clamp(24px,3vw,32px)',
          border: 'none',
          borderRadius: 3,
          fontFamily: 'Archivo, sans-serif',
          fontWeight: 600,
          fontSize: 17,
          letterSpacing: '.01em',
          cursor: ok ? 'pointer' : 'not-allowed',
          background: ok ? 'var(--af-ink, #12100F)' : 'var(--af-line, rgba(18,16,15,.12))',
          color: ok ? 'var(--af-bg, #F4F3F0)' : 'var(--af-mut, #6E6A65)',
          transition: 'background 240ms ease, color 240ms ease, opacity 240ms ease',
        }}
      >
        {label}
      </button>
      <p style={{ margin: '14px 0 0', fontSize: 12, lineHeight: 1.5, color: 'var(--af-mut, #6E6A65)' }}>{hint}</p>
    </>
  )
}
