export default function SubmitOverlay({ ui, title, body, whatsappHref, onRetry, retryLabel, onDismiss }) {
  if (ui === 'idle') return null
  const submitting = ui === 'submitting'
  const success = ui === 'success'
  const showActions = ui === 'error' || ui === 'slot_taken'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        background: 'rgba(10,9,9,.62)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        animation: 'afRise 260ms ease both',
      }}
    >
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', color: '#12100F', borderRadius: 4, padding: '30px 26px' }}>
        {submitting && (
          <div
            style={{
              width: 26,
              height: 26,
              border: '2px solid rgba(18,16,15,.16)',
              borderTopColor: '#12100F',
              borderRadius: '50%',
              animation: 'afSpin 800ms linear infinite',
              marginBottom: 20,
            }}
          />
        )}
        <p style={{ margin: '0 0 8px', fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 21, letterSpacing: '-.02em', lineHeight: 1.2 }}>
          {title}
        </p>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: '#6E6A65' }}>{body}</p>
        {success && whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 54,
              marginTop: 24,
              background: '#12100F',
              color: '#fff',
              borderRadius: 3,
              fontFamily: 'Archivo, sans-serif',
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: '.01em',
            }}
          >
            Abrir WhatsApp
          </a>
        )}
        {showActions && (
          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            <button
              type="button"
              onClick={onRetry}
              style={{
                flex: '1 1 auto',
                height: 52,
                background: '#12100F',
                color: '#fff',
                border: 'none',
                borderRadius: 3,
                fontFamily: 'Archivo, sans-serif',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              {retryLabel}
            </button>
            <button
              type="button"
              onClick={onDismiss}
              style={{
                flex: '0 0 auto',
                height: 52,
                padding: '0 18px',
                background: 'transparent',
                border: '1px solid rgba(18,16,15,.2)',
                borderRadius: 3,
                fontFamily: 'Archivo, sans-serif',
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
