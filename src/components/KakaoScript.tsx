'use client'

import Script from 'next/script'

import { NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY } from '../common/constants'

export default function KakaoScript() {
  return (
    <Script
      id="kakao"
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
      crossOrigin="anonymous"
      integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
      onLoad={() => window.Kakao.init(NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY)}
      onError={console.error}
      strategy="lazyOnload"
    />
  )
}
