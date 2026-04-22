import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Anlyfn Studio — Admin',
  description: 'Panel de administración privado',
  icons: { icon: '/anlyfn_icon.png' },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#020F16',
      }}
    >
      {children}
    </div>
  )
}
