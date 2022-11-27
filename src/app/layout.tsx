import './globals.css'

import localFont from '@next/font/local'
import { ReactNode } from 'react'

import ChannelTalk from '../components/ChannelTalk'
import GoogleAnalytics from '../components/GoogleAnalytics'

const myFont = localFont({ src: './PretendardVariable.woff2' })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko-KR" className={myFont.className}>
      <head />
      <ChannelTalk />
      <GoogleAnalytics />
      <body className={myFont.className}>{children}</body>
    </html>
  )
}
