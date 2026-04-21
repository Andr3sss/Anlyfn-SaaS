export default function StorefrontPage({
  params,
}: {
  params: { subdomain: string }
}) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <p>Storefront: <strong>{params.subdomain}</strong></p>
      <p style={{ color: '#888', fontSize: '0.8rem' }}>
        Motor del storefront — se construye en Fase 6.
      </p>
    </div>
  )
}
