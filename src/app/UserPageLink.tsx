'use client'

import Link from 'next/link'
import { useRecoilValue } from 'recoil'

import { currentUserAtom } from '../components/Recoil'

export default function UserPageLink() {
  const currentUser = useRecoilValue(currentUserAtom)

  return (
    <>
      {currentUser ? (
        <>
          <Link href={`/@${currentUser.userId}`}>내 여우</Link>
        </>
      ) : (
        <div className="flex gap-4">
          <Link href="/register">회원가입</Link>
          <Link href="/login">로그인</Link>
        </div>
      )}
    </>
  )
}
