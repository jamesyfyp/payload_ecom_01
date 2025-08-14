import React from 'react'
import './styles.css'
import NavBar from '@/components/navbar'

export const metadata = {
  description: 'A gallery for custom glass creation.',
  title: 'Welcome',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-base-100">
          <NavBar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
