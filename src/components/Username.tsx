'use client'

import useCurrentUser from '../app/hooks/useCurrentUser'

export default function Username() {
  const currentUser = useCurrentUser() as any

  return <pre>{JSON.stringify(currentUser, null, 2)}</pre>
}
