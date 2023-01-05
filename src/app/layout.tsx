import './globals.css'

import localFont from '@next/font/local'
import { ReactNode } from 'react'

import {
  APPLICATION_NAME,
  APPLICATION_SHORT_NAME,
  AUTHOR,
  CANONICAL_URL,
  KEYWORDS,
  SUBJECT,
} from '../common/constants'
import Authentication from '../components/Authentication'
import ChannelTalk from '../components/ChannelTalk'
import FlareLane from '../components/FlareLane'
import GoogleAnalytics from '../components/GoogleAnalytics'
import KakaoScript from '../components/KakaoScript'
import ReactHotToast from '../components/ReactHotToast'
import ReactQuery from '../components/ReactQuery'
import Recoil from '../components/Recoil'

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

      <meta property="og:site_name" content={APPLICATION_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ko_KR" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:alt" content={`${APPLICATION_SHORT_NAME} 로고`} />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f98c24" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#f98c24" />

      <link rel="shortcut icon" href="/images/shortcut-icon.png" />
      <link rel="canonical" href={CANONICAL_URL} />
      <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
      <meta name="author" content={AUTHOR} />
      <meta name="keywords" content={KEYWORDS} />
      <meta name="application-name" content={APPLICATION_SHORT_NAME} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content={APPLICATION_SHORT_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="subject" content={SUBJECT} />
      <meta name="rating" content="general" />
      <meta name="robots" content="index,follow" />
      <meta name="revisit-after" content="3 days" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <body className={myFont.className}>
        <Recoil>
          <ReactQuery>
            <Authentication>{children}</Authentication>
            <FlareLane />
          </ReactQuery>
        </Recoil>
        <ReactHotToast />
      </body>

      <ChannelTalk />
      <GoogleAnalytics />
      <KakaoScript />
    </html>
  )
}
