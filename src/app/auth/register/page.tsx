import Image from 'next/image'
import Link from 'next/link'

import GoogleLogo from '../../../svgs/google-logo.svg'
import KakaoLogo from '../../../svgs/kakao-logo.svg'
import NaverLogo from '../../../svgs/naver-logo.svg'
import RegisterForm from './RegisterForm'

export default function RegisterPage() {
  return (
    <>
      <h5 className="text-slate-700 text-center my-8">SNS 계정이 있다면</h5>

      <button
        className="mx-auto my-4 w-full max-w-screen-sm flex justify-center items-center gap-2 rounded-xl p-4 bg-[#fee500] text-black/90 hover:bg-[#ecd400] focus:bg-[#ecd400]"
        // onClick={goToKakaoLoginPage}
      >
        <KakaoLogo width="1.5rem" />
        카카오로 시작하기
      </button>
      <button
        className="mx-auto my-4 w-full max-w-screen-sm flex justify-center items-center gap-2 rounded-xl p-4 bg-[#03c75a] text-white hover:bg-[#03b152] focus:bg-[#03b152]"
        // onClick={goToNaverLoginPage}
      >
        <NaverLogo width="1.5rem" />
        네이버로 시작하기
      </button>

      <button
        className="mx-auto my-4 w-full max-w-screen-sm flex justify-center items-center gap-2 rounded-xl p-4 bg-white border hover:bg-[#eee] focus:bg-[#eee]"
        // onClick={goToGoogleLoginPage}
      >
        <GoogleLogo width="1.5rem" />
        Google 계정으로 시작하기
      </button>

      <h5 className="text-slate-700 text-center mt-12 mb-8">또는 직접 가입하기</h5>

      <RegisterForm />
    </>
  )
}
