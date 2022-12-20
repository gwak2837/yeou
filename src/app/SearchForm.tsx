'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

import { NEXT_PUBLIC_BACKEND_URL } from '../common/constants'
import { fetchCatchingError, toastError } from '../common/utils'

export default function SearchForm() {
  const [productURL, setProductURL] = useState('')
  const [enabled, setEnabled] = useState(false)

  const { data, isError, isLoading } = useQuery({
    queryKey: ['product', productURL],
    queryFn: () => fetchCatchingError(`/product?url=${encodeURIComponent(productURL)}`),
    onError: toastError,
    enabled,
  })

  function search(e: any) {
    e.preventDefault()
    setEnabled(true)
  }

  function changeProductURL(e: ChangeEvent<HTMLInputElement>) {
    const url = e.target.value
    setProductURL(url)
    if (!url) setEnabled(false)
  }

  return (
    <>
      <form onSubmit={search}>
        <input
          className=" w-full	p-2	border-2 border-slate-300 focus:outline-fox-600 disabled:bg-slate-100 disabled:cursor-not-allowed"
          disabled={enabled && isLoading}
          // disabled={true}
          onChange={changeProductURL}
          placeholder="URL 주소를 입력해주세요"
          value={productURL}
        />
        <button
          className="bg-fox-700 w-full p-2 my-4 text-white font-semibold text-xl disabled:bg-slate-300 disabled:cursor-not-allowed"
          disabled={!productURL || (enabled && isLoading)}
          type="submit"
        >
          검색
        </button>
      </form>

      <div>{enabled && isLoading && 'loading...'}</div>

      {!isError && data && (
        <>
          <button className="bg-fox-700 w-full p-2 my-4 text-white font-semibold text-xl">
            알림받기
          </button>
          <pre className="border-2 border-slate-300 overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
          <Image src={data.imageUrl} alt="cover" width="300" height="300" />
          {data.creditCardCompanies?.map((card: any, i: number) => (
            <Image key={i} src={card} alt="cover" width="30" height="30" />
          ))}
        </>
      )}
    </>
  )
}
