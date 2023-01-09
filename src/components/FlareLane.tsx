'use client'

import FlarelaneSDK from '@flarelane/flarelane-web-sdk'
import { useQueryClient } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { NEXT_PUBLIC_FLARE_LANE_PROJECT_ID, NODE_ENV } from '../common/constants'
import { fetchThrowingError } from '../common/utils'

export default function FlareLane() {
  const [mustRefetchUser, setMustRefetchUser] = useState(false)

  async function initializeFlareLane() {
    await FlarelaneSDK.initialize({ projectId: NEXT_PUBLIC_FLARE_LANE_PROJECT_ID })

    if (NODE_ENV === 'production') FlarelaneSDK.setLogLevel('error')

    FlarelaneSDK.getIsSubscribed((isSubscribed) => {
      if (!isSubscribed) return

      FlarelaneSDK.getDeviceId(async (deviceId) => {
        console.log('👀 - deviceId', deviceId)
        if (!deviceId) return

        const { jwt } = await fetchThrowingError('/auth/flare-lane', {
          headers: { 'device-id': deviceId },
        })

        sessionStorage.setItem('jwt', jwt)
        setMustRefetchUser(true)
      })
    })
  }

  useEffect(() => {
    initializeFlareLane()
  }, [])

  const queryClient = useQueryClient()

  useEffect(() => {
    if (mustRefetchUser) {
      queryClient.refetchQueries({ queryKey: ['user'], type: 'active' })
      setMustRefetchUser(false)
    }
  }, [mustRefetchUser, queryClient])

  const pathname = usePathname()

  useEffect(() => {
    if (pathname) {
      FlarelaneSDK.setCurrentPath(pathname)
    }
  }, [pathname])

  return null
}
