import './globals.css'

import localFont from '@next/font/local'
import { ReactNode } from 'react'

import ChannelTalk from '../components/ChannelTalk'
import GoogleAnalytics from '../components/GoogleAnalytics'

const myFont = localFont({
  src: './PretendardVariable.woff2',
  fallback: [
    'Pretendard',
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
})

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
