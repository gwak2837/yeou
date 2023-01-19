import Image from 'next/image'
import Link from 'next/link'

import GoogleLogo from '../../svgs/google-logo.svg'
import KakaoLogo from '../../svgs/kakao-logo.svg'
import NaverLogo from '../../svgs/naver-logo.svg'
import LoginForm from './LoginForm'
import { goToGoogleLoginPage, goToKakaoLoginPage, goToNaverLoginPage } from './oauth'

export default function LoginPage() {
  return (
    <main className="m-auto max-w-screen-md p-2">
      <Link
        href="/"
        className="my-12 flex gap-4 justify-center items-center hover:no-underline focus:no-underline"
      >
        <Image src="/images/fox.webp" alt="fox" width="64" height="64" />
        <h1 className="text-4xl text-fox-700 ">새소식</h1>
      </Link>

      <div className="mx-auto my-4 w-full max-w-screen-sm  bg-slate-100 rounded-lg text-center p-4">
        새소식에서 여러 사이트 상품 관련 알림을 받아보세요
      </div>

      <LoginForm />

      <h5 className="text-slate-700 text-center	mt-12 mb-8">이미 SNS 계정을 연동했다면</h5>

      <button
        className="mx-auto my-4 w-full max-w-screen-sm flex justify-center items-center gap-2 rounded-xl p-4 bg-[#fee500] text-black/90 hover:bg-[#ecd400] focus:bg-[#ecd400]"
        onClick={goToKakaoLoginPage}
      >
        <KakaoLogo width="1.5rem" />
        카카오 로그인
      </button>
      <button
        className="mx-auto my-4 w-full max-w-screen-sm flex justify-center items-center gap-2 rounded-xl p-4 bg-[#03c75a] text-white hover:bg-[#03b152] focus:bg-[#03b152]"
        onClick={goToNaverLoginPage}
      >
        <NaverLogo width="1.5rem" />
        네이버 로그인
      </button>

      <button
        className="mx-auto my-4 w-full max-w-screen-sm flex justify-center items-center gap-2 rounded-xl p-4 bg-white border hover:bg-[#eee] focus:bg-[#eee]"
        onClick={goToGoogleLoginPage}
      >
        <GoogleLogo width="1.5rem" />
        Google 로그인
      </button>
    </main>
  )
}
