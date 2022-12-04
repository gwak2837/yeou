'use client'

import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'
import toast from 'react-hot-toast'

import { NEXT_PUBLIC_BACKEND_URL, NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY } from '../common/constants'
import { localStorage, sessionStorage } from '../common/constants'
import { fetchWithJWT } from '../common/utils'
import { bootChanneltalk } from './ChannelTalk'

type Props = {
  children: ReactNode
}

export default function Authentication({ children }: Props) {
  useQuery({
    queryKey: ['user'],
    queryFn: () => fetchWithJWT(`${NEXT_PUBLIC_BACKEND_URL}/user`),
    onError: (error: any) => {
      toast.error(`${error}`)
      sessionStorage?.removeItem('jwt')
      localStorage?.removeItem('jwt')
      bootChanneltalk({ pluginKey: NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY })
    },
    onSuccess: ({ user }: any) => {
      bootChanneltalk({
        pluginKey: NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY,
        // memberId: myNickname.id, // 채널톡-자유담 회원 정보 연동 필요
        ...(user?.name && {
          profile: {
            name: user.name,
          },
        }),
      })
    },
  })

  return <>{children}</>
}
