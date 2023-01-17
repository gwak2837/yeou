'use client'

import { ReactNode } from 'react'
import { RecoilRoot, atom } from 'recoil'

type Props = {
  children: ReactNode
}

export default function Recoil({ children }: Props) {
  return <RecoilRoot>{children}</RecoilRoot>
}

type User = {
  userId: string | null
  username: string | null
  isFlareLane: boolean
}

export const currentUserAtom = atom<User | null>({
  key: 'currentUser',
  default: null,
})
