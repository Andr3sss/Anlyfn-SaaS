export default async function StorefrontPage({
  params,
}: {
  params: Promise<{ subdomain: string }>
}) {
  const { subdomain } = await params

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <p>Storefront: <strong>{subdomain}</strong></p>
      <p style={{ color: '#888', fontSize: '0.8rem' }}>
        Motor del storefront — se construye en Fase 6.
      </p>
    </div>
  )
}
