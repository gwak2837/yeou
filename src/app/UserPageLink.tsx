'use client'

import Link from 'next/link'
import { useRecoilState, useRecoilValue } from 'recoil'

import { NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY } from '../common/constants'
import { bootChanneltalk } from '../components/ChannelTalk'
import { currentUserAtom } from '../components/Recoil'

export default function UserPageLink() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom)

  function logout() {
    sessionStorage.removeItem('jwt')
    localStorage.removeItem('jwt')
    setCurrentUser(null)
    bootChanneltalk({ pluginKey: NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY })
  }

  return (
    <div className="flex gap-4">
      {currentUser ? (
        <>
          <button
            className="text-fox-800 font-medium hover:underline focus:underline"
            onClick={logout}
          >
            로그아웃
          </button>
          <Link href={`/@${currentUser.userId}`}>내 여우{currentUser.isFlareLane && '(임시)'}</Link>
        </>
      ) : (
        <>
          <Link href="/register">회원가입</Link>
          <Link href="/login">로그인</Link>
        </>
      )}
    </div>
  )
}
