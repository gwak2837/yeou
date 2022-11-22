import './globals.css'

import { ReactNode } from 'react'

import ChannelTalk from '../components/ChannelTalk'
import GoogleAnalytics from '../components/GoogleAnalytics'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head />
      <ChannelTalk />
      <GoogleAnalytics />
      <body>{children}</body>
    </html>
  )
}
