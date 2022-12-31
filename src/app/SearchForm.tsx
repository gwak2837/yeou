'use client'

import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'

import { fetchWithJWT, toastError } from '../common/utils'
import LoadingSpinner from '../components/LoadingSpinner'
import Username from '../components/Username'
import useCurrentUser from '../hooks/useCurrentUser'
import NotificationForm from './NotificationForm'
import SearchResult from './SearchResult'

// import Select from 'react-select'

export type Product = {
  id: string
  name: string
  options:
    | {
        title: string
        value: string
      }[]
    | null
  originalPrice: number | null
  salePrice: number | null
  couponPrice: number | null
  cards:
    | {
        company: string
        absolute: number
        relative: number
        onlyWOW: boolean
      }[]
    | null
  coupons:
    | {
        discount: string
        condition: string
      }[]
    | null
  reward: number | null
  maximumDiscount: number | null
  minimumPrice: number
  imageUrl: string
  reviewURL: string
  reviewCount: number
  isOutOfStock: boolean
  notificationCondition: {
    prices: {
      limit: number
      fluctuation: 'more' | 'less'
      unit: number
    }[]
    hasCardDiscount: boolean
    hasCouponDiscount: boolean
    canBuy: boolean
  } | null
}

const product: Product = {
  id: '1',
  name: '팜즈 에어팟맥스 호환 헤드셋 거치대',
  options: [
    {
      title: '색상',
      value: '실버',
    },
  ],
  originalPrice: null,
  salePrice: 15840,
  couponPrice: null,
  reward: 792,
  maximumDiscount: 792,
  minimumPrice: 15048,
  coupons: null,
  cards: null,
  imageUrl: 'https://item.coupangcdn.com',
  reviewURL: 'https://item.coupangcdn.com#sdpReview',
  reviewCount: 42,
  isOutOfStock: false,
  notificationCondition: {
    prices: [
      {
        limit: 1000,
        fluctuation: 'more' as const,
        unit: 1000,
      },
      {
        limit: 100,
        fluctuation: 'more' as const,
        unit: 10000,
      },
    ],
    hasCardDiscount: true,
    hasCouponDiscount: true,
    canBuy: true,
  },
}

export default function SearchForm() {
  // Get product data
  const [productURL, setProductURL] = useState('')
  const [enabled, setEnabled] = useState(false)

  const {
    data: product,
    isError,
    isLoading,
  } = useQuery<Product>({
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

  return (
    <>
      <form onSubmit={search}>
        <div className="p-2">
          <input
            className="w-full	p-2	border-2 border-slate-300 focus:outline-fox-600 disabled:bg-slate-100 disabled:cursor-not-allowed"
            disabled={enabled && isLoading}
            onChange={changeProductURL}
            placeholder="URL 주소를 입력해주세요"
            value={productURL}
          />
        </div>
        <button
          className="bg-fox-700 w-full p-2 my-4 text-white font-semibold text-xl disabled:bg-slate-300 disabled:cursor-not-allowed"
          disabled={!productURL || (enabled && isLoading)}
          type="submit"
        >
          <div className="flex gap-2 justify-center items-center">
            {enabled && isLoading && <LoadingSpinner />}
            <div>검색</div>
          </div>
        </button>
      </form>

      {!isError && product && <NotificationForm product={product} />}
      {!isError && product && <SearchResult product={product} />}
    </>
  )
}
