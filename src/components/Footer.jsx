const MAPS_URL = 'https://maps.app.goo.gl/4AHTHJz47V8kMF446'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--af-line, rgba(18,16,15,.12))', padding: '22px 20px' }}>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px 24px',
          justifyContent: 'space-between',
          fontSize: 12,
          color: 'var(--af-mut, #6E6A65)',
        }}
      >
        <span>AutoFrancia SRL &middot; Peugeot &amp; Chevrolet</span>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener"
          style={{ borderBottom: '1px solid var(--af-line, rgba(18,16,15,.12))' }}
        >
          Av. Beijing esq. Jes&uacute;s Aguayo, Cochabamba &mdash; ver en Google Maps
        </a>
      </div>
    </footer>
  )
}
