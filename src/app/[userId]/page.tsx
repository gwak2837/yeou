import Image from 'next/image'
import Link from 'next/link'

export default function UserPage() {
  return (
    <div className="px-8">
      <main className="min-h-screen py-16 flex-1 flex flex-col justify-center items-center">
        <h1 className="m-0 text-6xl not-italic font-extrabold tracking-tight text-center dark:bg-clip-text">
          환영합니다 to{' '}
          <a
            className="no-underline text-blue-600 hover:underline focus:underline active:underline "
            href="https://nextjs.org"
          >
            Next.js 13!
          </a>
        </h1>
      </main>
    </div>
  )
}
