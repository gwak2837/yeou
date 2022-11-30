'use client'

import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'
import toast from 'react-hot-toast'

import useCurrentUser from '../app/hooks/useCurrentUser'
import { NEXT_PUBLIC_BACKEND_URL, NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY } from '../common/constants'
import { localStorage, sessionStorage } from '../common/constants'
import { bootChanneltalk } from './ChannelTalk'

type Props = {
  children: ReactNode
}

export default function Authentication({ children }: Props) {
  const currentUser = useCurrentUser()

  const jwt = sessionStorage?.getItem('jwt') || localStorage?.getItem('jwt')

  useQuery({
    queryKey: ['user'],
    queryFn: () => fetch(`${NEXT_PUBLIC_BACKEND_URL}/user?jwt=${jwt}`).then((res) => res.json()),
    enabled: !currentUser && Boolean(jwt),
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

  console.log('👀 - !currentUser && Boolean(jwt)', !currentUser && Boolean(jwt))

  return <>{children}</>
}
