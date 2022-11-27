export const NODE_ENV = process.env.NODE_ENV as string
export const NEXT_PUBLIC_PROJECT_ENV = process.env.NEXT_PUBLIC_PROJECT_ENV as string
export const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string
export const NEXT_PUBLIC_VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string

const NEXT_PUBLIC_VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL as string
const NEXT_PUBLIC_VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV as string

export const NEXT_PUBLIC_BBATON_CLIENT_ID = process.env.NEXT_PUBLIC_BBATON_CLIENT_ID as string

export const NEXT_PUBLIC_NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID as string

export const NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY = process.env
  .NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY as string
export const NEXT_PUBLIC_KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY as string

export const NEXT_PUBLIC_GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string
export const NEXT_PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GA_ID as string

export const NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY = process.env
  .NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY as string

// if (!NEXT_PUBLIC_PROJECT_ENV) throw new Error('`NEXT_PUBLIC_PROJECT_ENV` 환경 변수를 설정해주세요.')
// if (!NEXT_PUBLIC_BACKEND_URL) throw new Error('`NEXT_PUBLIC_BACKEND_URL` 환경 변수를 설정해주세요.')
// if (!NEXT_PUBLIC_VAPID_PUBLIC_KEY)
//   throw new Error('`NEXT_PUBLIC_VAPID_PUBLIC_KEY` 환경 변수를 설정해주세요.')

// if (NEXT_PUBLIC_PROJECT_ENV.startsWith('cloud') && !NEXT_PUBLIC_VERCEL_URL)
//   throw new Error('`NEXT_PUBLIC_VERCEL_URL` 환경 변수를 설정해주세요.')
// if (NEXT_PUBLIC_PROJECT_ENV.startsWith('cloud') && !NEXT_PUBLIC_VERCEL_ENV)
//   throw new Error('`NEXT_PUBLIC_VERCEL_ENV` 환경 변수를 설정해주세요.')

// if (!NEXT_PUBLIC_BBATON_CLIENT_ID)
//   throw new Error('`NEXT_PUBLIC_BBATON_CLIENT_ID` 환경 변수를 설정해주세요.')

// if (!NEXT_PUBLIC_NAVER_CLIENT_ID)
//   throw new Error('`NEXT_PUBLIC_NAVER_CLIENT_ID` 환경 변수를 설정해주세요.')

// if (!NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY)
//   throw new Error('`NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY` 환경 변수를 설정해주세요.')
// if (!NEXT_PUBLIC_KAKAO_REST_API_KEY)
//   throw new Error('`NEXT_PUBLIC_KAKAO_REST_API_KEY` 환경 변수를 설정해주세요.')

// if (!NEXT_PUBLIC_GOOGLE_CLIENT_ID)
//   throw new Error('`NEXT_PUBLIC_GOOGLE_CLIENT_ID` 환경 변수를 설정해주세요.')
// if (NEXT_PUBLIC_PROJECT_ENV === 'cloud-prod' && !NEXT_PUBLIC_GOOGLE_ANALYTICS_ID)
//   throw new Error('`NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` 환경 변수를 설정해주세요.')

// if (!NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY)
//   throw new Error('`NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY` 환경 변수를 설정해주세요.')

export const APPLICATION_NAME = '새소식 - 쿠팡 알리미' // = site.webmanifest name
export const APPLICATION_SHORT_NAME = '새소식' // = site.webmanifest short_name
export const SUBJECT = '쿠팡 가격 변동 알리미'
export const KEYWORDS = `${APPLICATION_SHORT_NAME},coopang,price,alert,쿠팡,가격,알리미` // 최대 10개
export const AUTHOR = '곽태욱(Taeuk Gwak)'
export const CANONICAL_URL =
  NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://coopang.vercel.app'
    : NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? `https://${NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'
