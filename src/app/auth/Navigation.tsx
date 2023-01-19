'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <div className="text-slate-700  my-8 flex justify-center items-center gap-2">
      {pathname === '/auth/login' ? (
        <>
          아직 가입하지 않았으면
          <nav className="text-center">
            <Link href="/auth/register">회원가입하기</Link>
          </nav>
        </>
      ) : (
        <>
          이미 가입했으면
          <nav className="text-center">
            <Link href="/auth/login">로그인하기</Link>
          </nav>
        </>
      )}
    </div>
  )
}
