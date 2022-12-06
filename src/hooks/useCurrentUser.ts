'use client'

import { useQueryClient } from '@tanstack/react-query'
import { NEXT_PUBLIC_BACKEND_URL } from '../common/constants'

export default function useCurrentUser() {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<any>(['user', NEXT_PUBLIC_BACKEND_URL])

  return currentUser
}
