export default function StorefrontNotFound() {
  return (
    <div
      style={{
        background: '#020F16',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      <style>{`
        @keyframes sf-pulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.35; }
        }
        .sf-grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(10,123,158,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,123,158,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          animation: sf-pulse 4s ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>

      <div className="sf-grid-bg" />

      <div style={{ position: 'relative', textAlign: 'center', maxWidth: '520px' }}>
        {/* Decorative line above */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2.5rem',
          justifyContent: 'center',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(10,123,158,0.3)' }} />
          <span style={{
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            color: '#0A7B9E',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
          }}>
            ANLYFN STUDIO
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(10,123,158,0.3)' }} />
        </div>

        {/* 404 number */}
        <div style={{
          fontSize: 'clamp(6rem, 20vw, 10rem)',
          fontWeight: 700,
          lineHeight: 0.85,
          letterSpacing: '-0.05em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(10,123,158,0.5)',
          fontFamily: 'monospace',
          marginBottom: '0.5rem',
          userSelect: 'none',
        }}>
          404
        </div>

        {/* Accent bar */}
        <div style={{
          width: '3rem',
          height: '3px',
          background: '#0A7B9E',
          margin: '1.5rem auto',
          borderRadius: '2px',
        }} />

        {/* Heading */}
        <h1 style={{
          fontSize: '1rem',
          fontWeight: 400,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#E8F6FA',
          margin: '0 0 1rem',
          fontFamily: 'monospace',
        }}>
          Storefront no encontrado
        </h1>

        {/* Body */}
        <p style={{
          color: '#3A6B7A',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          margin: '0 0 2.5rem',
          fontFamily: 'Georgia, serif',
        }}>
          El negocio que buscas no existe o todavía no está
          disponible en esta plataforma.
        </p>

        {/* Decorative line below */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(10,123,158,0.25), transparent)',
          marginBottom: '1.5rem',
        }} />

        <div style={{
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          color: '#1E4D5E',
          textTransform: 'uppercase',
          fontFamily: 'monospace',
        }}>
          plataforma · studio · system
        </div>
      </div>
    </div>
  )
}
