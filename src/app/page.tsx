import Image from 'next/image'
import Link from 'next/link'

import Username from '../components/Username'
import SearchForm from './SearchForm'

export default function HomePage() {
  return (
    <div className="px-8">
      <main className="py-16">
        <Username />
        <SearchForm />
      </main>
    </div>
  )
}
