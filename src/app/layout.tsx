import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { AppHeader } from '@/components/app/AppHeader'
import '@/styles/base/_reset.scss'
import '@/styles/globals.scss'
import { AntdRegistry } from '@ant-design/nextjs-registry'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Task Planner',
  description: 'Manage your task plan',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdRegistry>
          <AppHeader />

          {children}
        </AntdRegistry>
      </body>
    </html>
  )
}
