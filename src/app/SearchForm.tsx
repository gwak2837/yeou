'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

import { fetchWithJWT, toastError } from '../common/utils'
import useCurrentUser from '../hooks/useCurrentUser'

export default function SearchForm() {
  const user = useCurrentUser()
  console.log('👀 - user', user)

  // Get product data
  const [productURL, setProductURL] = useState('')
  const [enabled, setEnabled] = useState(false)

  const { data, isError, isLoading } = useQuery({
    queryKey: ['product', productURL],
    queryFn: () => fetchWithJWT(`/product?url=${encodeURIComponent(productURL)}`),
    enabled,
    onError: (error: any) => {
      setEnabled(false)
      toastError(error)
    },
    onSuccess: () => setEnabled(false),
    retry: false,
  })

  function search(e: any) {
    e.preventDefault()
    setEnabled(true)
  }

  function changeProductURL(e: ChangeEvent<HTMLInputElement>) {
    setProductURL(e.target.value)
  }

  // Toggle subscription
  const {
    isLoading: isSubscriptionLoading,
    isError: isSubscriptionError,
    mutate,
  } = useMutation({
    mutationFn: (newTodo) => fetchWithJWT(`/product/${data?.id}/subscribe`),
  })

  function toggleSubscription() {}

  return (
    <>
      <form onSubmit={search}>
        <input
          className=" w-full	p-2	border-2 border-slate-300 focus:outline-fox-600 disabled:bg-slate-100 disabled:cursor-not-allowed"
          disabled={enabled && isLoading}
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

      <pre className="border-2 border-slate-300 overflow-x-auto">
        {JSON.stringify(user, null, 2)}
      </pre>

      <div>{enabled && isLoading && 'loading...'}</div>

      {!isError && data && (
        <>
          <button
            className="bg-fox-700 w-full p-2 my-4 text-white font-semibold text-xl"
            onClick={toggleSubscription}
          >
            {data.isSubscribed ? '알림끊기' : '알림받기'}
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
