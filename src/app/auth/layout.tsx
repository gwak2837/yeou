import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import Navigation from './Navigation'

type Props = {
  children: ReactNode
}

export default function AuthLayout({ children }: Props) {
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

      <Navigation />

      {children}
    </main>
  )
}
