'use client'

import useCurrentUser from '../app/hooks/useCurrentUser'

export default function Username() {
  const currentUser = useCurrentUser() as any
  console.log('👀 - currentUser', currentUser)

  return <pre>{JSON.stringify(currentUser, null, 2)}</pre>
}
