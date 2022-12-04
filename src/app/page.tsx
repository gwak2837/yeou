import Image from 'next/image'
import Link from 'next/link'

import Username from '../components/Username'

export default function HomePage() {
  return (
    <div className="px-8">
      <main className="min-h-screen py-16 flex-1 flex flex-col justify-center items-center">
        <Link href="/oauth?jwt=123">이동</Link>
        <Username />
      </main>
    </div>
  )
}
