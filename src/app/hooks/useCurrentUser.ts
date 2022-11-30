'use client'

import { useQueryClient } from '@tanstack/react-query'

export default function useCurrentUser() {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData(['user'])

  return currentUser
}
