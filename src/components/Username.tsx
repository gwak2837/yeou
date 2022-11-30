'use client'

import useCurrentUser from '../app/hooks/useCurrentUser'

export default function Username() {
  const currentUser = useCurrentUser() as any
  console.log('👀 - currentUser', currentUser)

  return <h2>{currentUser?.user?.name}</h2>
}
