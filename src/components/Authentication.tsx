'use client'

import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'
import toast from 'react-hot-toast'
import { useSetRecoilState } from 'recoil'

import { NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY } from '../common/constants'
import { localStorage, sessionStorage } from '../common/constants'
import { fetchWithJWT } from '../common/utils'
import { bootChanneltalk } from './ChannelTalk'
import { currentUserAtom } from './Recoil'

type Props = {
  children: ReactNode
}

export default function Authentication({ children }: Props) {
  const setCurrentUser = useSetRecoilState(currentUserAtom)

  useQuery({
    queryKey: ['user'],
    queryFn: () => fetchWithJWT(`/auth`),
    onError: (error: any) => {
      toast.error(error.message)
      sessionStorage?.removeItem('jwt')
      localStorage?.removeItem('jwt')
      bootChanneltalk({ pluginKey: NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY })
    },
    onSuccess: (user) => {
      setCurrentUser(user)
      bootChanneltalk({
        pluginKey: NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY,
        // memberId: myNickname.id, // 채널톡-자유담 회원 정보 연동 필요
        ...(user?.username && {
          profile: {
            name: user.username,
          },
        }),
      })
    },
  })

  return <>{children}</>
}
