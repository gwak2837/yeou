'use client'

import {
  NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_KAKAO_REST_API_KEY,
  NEXT_PUBLIC_NAVER_CLIENT_ID,
} from '../../../common/constants'

export function goToKakaoLoginPage() {
  window.location.replace(
    `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${NEXT_PUBLIC_BACKEND_URL}/auth/kakao`
  )
}

export function goToNaverLoginPage() {
  window.location.replace(
    `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${NEXT_PUBLIC_BACKEND_URL}/auth/naver&state=state`
  )
}

export function goToGoogleLoginPage() {
  window.location.replace(
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${NEXT_PUBLIC_BACKEND_URL}/auth/google&response_type=code&scope=openid+profile`
  )
}
