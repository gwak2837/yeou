'use client'

import useCurrentUser from '../hooks/useCurrentUser'

export default function Username() {
  const currentUser = useCurrentUser() as any

  return <pre>{JSON.stringify(currentUser, null, 2)}</pre>
}
