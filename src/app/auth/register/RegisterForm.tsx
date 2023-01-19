'use client'

import Image from 'next/image'

export default function RegisterForm() {
  return (
    <form>
      <div className="my-6">
        <input
          className="block mx-auto my-4 w-full max-w-screen-sm border p-3"
          placeholder="아이디"
        />
        <input
          className="block mx-auto my-4 w-full max-w-screen-sm border p-3"
          placeholder="비밀번호"
        />
        <input
          className="block mx-auto my-4 w-full max-w-screen-sm border p-3"
          placeholder="비밀번호 확인"
        />
        <input
          className="block mx-auto my-4 w-full max-w-screen-sm border p-3"
          placeholder="이메일"
        />
        <input
          className="block mx-auto my-4 w-full max-w-screen-sm border p-3"
          placeholder="전화번호"
        />
      </div>
      <button className="mx-auto my-4 w-full max-w-screen-sm flex justify-center items-center gap-2 rounded-xl p-4 bg-fox-700 text-white font-semibold hover:bg-fox-800 focus:bg-fox-800">
        <Image src="/images/fox.webp" alt="yeou logo" width="25" height="25" />
        가입하기
      </button>
    </form>
  )
}
