import Image from 'next/image'
import Link from 'next/link'

import UserPageLink from '../UserPageLink'
import Notifications from './Notifications'

export default function UserPage() {
  return (
    <main>
      <div className="flex flex-wrap justify-around items-center gap-x-8 gap-y-4 m-4 sm:my-8 sm:mx-0">
        <Link href="/" className="hover:no-underline focus:no-underline">
          <div className="flex gap-4 items-center">
            <Image src="/images/fox.webp" alt="fox" width="64" height="64" />
            <h1 className="text-4xl text-fox-700 ">새소식</h1>
          </div>
        </Link>
        <UserPageLink />
      </div>
      <Notifications />
    </main>
  )
}
