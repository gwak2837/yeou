'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LoginLink() {
  const pathname = usePathname()

  return (
    <Link
      href="/login"
      onClick={() => pathname && sessionStorage.setItem('redirectToAfterLogin', pathname)}
    >
      로그인하기
    </Link>
  )
}
