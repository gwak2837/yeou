'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'
import { NEXT_PUBLIC_BACKEND_URL } from '../common/constants'

export default function SearchForm() {
  const [productURL, setProductURL] = useState('')
  const [enabled, setEnabled] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['product', productURL, NEXT_PUBLIC_BACKEND_URL],
    queryFn: () =>
      fetch(`${NEXT_PUBLIC_BACKEND_URL}/product?url=${encodeURIComponent(productURL)}`).then(
        (response) => response.json()
      ),
    enabled,
  })

  function search(e: any) {
    e.preventDefault()
    setEnabled(true)
  }

  return (
    <>
      <form onSubmit={search}>
        <input
          className="border-2 border-gray-200"
          onChange={(e) => setProductURL(e.target.value)}
          value={productURL}
        />
        <button type="submit">검색</button>
      </form>
      <pre className="border-2 border-gray-200 overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>

      <div>{isLoading}</div>

      {data && (
        <>
          <Image src={data.imageUrl} alt="cover" width="300" height="300" />
          {data.creditCardCompanies?.map((card, i) => (
            <Image key={i} src={card} alt="cover" width="30" height="30" />
          ))}
        </>
      )}
    </>
  )
}
