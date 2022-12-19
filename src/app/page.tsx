import Image from 'next/image'
import Link from 'next/link'

import Username from '../components/Username'
import SearchForm from './SearchForm'

export default function HomePage() {
  return (
    <main className="py-16 max-w-screen-md mx-auto">
      <SearchForm />
    </main>
  )
}
