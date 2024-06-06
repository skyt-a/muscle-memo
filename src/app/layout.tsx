import { StyleProvider } from '@/lib/styles/StyleProvider'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import classname from './layout.module.css'

import './global.css'

export const metadata: Metadata = {
  title: '筋トレメモ',
  description: '筋トレメモ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="dark">
      <body>
        <StyleProvider>
          <div className={classname.wrapper}>
            <div className={classname.container}>{children}</div>
          </div>
          <Toaster />
        </StyleProvider>
      </body>
    </html>
  )
}
