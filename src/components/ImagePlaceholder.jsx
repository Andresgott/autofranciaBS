export default function ImagePlaceholder({ caption, tone = 'light', style }) {
  const dark = tone === 'dark'
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: dark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.03)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: 16 }}>
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke={dark ? 'rgba(255,255,255,.32)' : 'rgba(0,0,0,.24)'}
          strokeWidth="1.4"
        >
          <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" />
          <circle cx="8.2" cy="10" r="1.6" />
          <path d="M21 15.5l-5.2-5.2a1.5 1.5 0 0 0-2.12 0L4 19.5" />
        </svg>
        <span
          style={{
            fontFamily: 'Archivo, sans-serif',
            fontSize: 11,
            letterSpacing: '.04em',
            textAlign: 'center',
            color: dark ? 'rgba(255,255,255,.4)' : 'rgba(0,0,0,.36)',
            maxWidth: 200,
          }}
        >
          {caption}
        </span>
      </div>
    </div>
  )
}
