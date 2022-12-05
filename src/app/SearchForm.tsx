'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function SearchForm() {
  const [productURL, setProductURL] = useState('')
  const [enabled, setEnabled] = useState(false)

  const { data } = useQuery({
    queryKey: ['product', productURL],
    queryFn: () =>
      fetch(`/api/product?productURL=${encodeURIComponent(productURL)}`).then((response) =>
        response.json()
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
    </>
  )
}
