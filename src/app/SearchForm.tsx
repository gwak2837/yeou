'use client'

import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'

import { fetchWithJWT, toastError } from '../common/utils'
import LoadingSpinner from '../components/LoadingSpinner'
import NotificationForm from './NotificationForm'
import SearchResult from './SearchResult'

export default function SearchForm() {
  // Get product data
  const [productURL, setProductURL] = useState('')
  const [enabled, setEnabled] = useState(false)

  const {
    data: product,
    error,
    isFetching,
  } = useQuery<Product>({
    queryKey: ['product', productURL],
    queryFn: () => fetchWithJWT(`/product?url=${encodeURIComponent(productURL)}`),
    enabled,
    onError: (error: any) => {
      setEnabled(false)
      toastError(error)
    },
    onSuccess: () => setEnabled(false),
    placeholderData: productPlaceholder,
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
            disabled={enabled && isFetching}
            onChange={changeProductURL}
            placeholder="URL 주소를 입력해주세요"
            value={productURL}
          />
        </div>
        <button
          className="bg-fox-700 w-full p-2 my-4 text-white font-semibold text-xl disabled:bg-slate-300 disabled:cursor-not-allowed"
          disabled={!productURL || (enabled && isFetching)}
          type="submit"
        >
          <div className="flex gap-2 justify-center items-center">
            {enabled && isFetching && <LoadingSpinner />}
            <div>검색</div>
          </div>
        </button>
      </form>

      {error && (
        <pre className="border-2 border-slate-300 overflow-x-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
      )}

      {product && (
        <>
          <NotificationForm product={product} isFetching={isFetching} />
          <SearchResult product={product as ProductPlaceholder} isFetching={isFetching} />
        </>
      )}
    </>
  )
}

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
  maximumCardDiscount: number | null
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
  reviewCount: string
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

export type ProductPlaceholder = Product & { isPlaceholder: boolean }

const productPlaceholder: ProductPlaceholder = {
  id: '1',
  name: 'Apple 정품 2022 아이패드 10세대',
  options: [
    { title: '색상', value: '블루' },
    { title: '저장용량 × 태블릿 연결성', value: '64GB × Wi-Fi' },
  ],
  originalPrice: 679000,
  salePrice: null,
  couponPrice: 622900,
  cards: [
    {
      company:
        'https://image6.coupangcdn.com/image/static/common/cardbenefit/20180521/KB-MOBILE-81873725-3561-4cea-a79a-7cef32914869.png',
      absolute: 63000,
      relative: 10,
      onlyWOW: true,
    },
    {
      company:
        'https://image6.coupangcdn.com/image/static/common/cardbenefit/20210507/LOTTE-MOBILE-2989838a-5d29-4b36-b39c-f7fc07c5f974.jpg',
      absolute: 24000,
      relative: 4,
      onlyWOW: true,
    },
    {
      company:
        'https://image6.coupangcdn.com/image/static/common/cardbenefit/20170419/HANA_SK-MOBILE-bf9d31ed-1ddd-4286-aa70-6e9882aecdec.png',
      absolute: 24000,
      relative: 4,
      onlyWOW: true,
    },
    {
      company:
        'https://image6.coupangcdn.com/image/static/common/cardbenefit/20180521/NH-MOBILE-2eeeabd1-2fca-4f85-b4eb-f9d98ca382b8.png',
      absolute: 35000,
      relative: 6,
      onlyWOW: true,
    },
  ],
  maximumCardDiscount: 62290,
  coupons: null,
  reward: 31145,
  maximumDiscount: 62290,
  minimumPrice: 560610,
  imageUrl:
    'https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2363422884128619-2e83f9a6-d11d-4cb5-813d-5d7de0751eb0.jpg',
  reviewURL:
    'https://www.coupang.com/vp/products/6912124565?itemId=16661691663&itemsCount=36&rank=3&vendorItemId=83845338385#sdpReview',
  reviewCount: '111개 상품평',
  isOutOfStock: false,
  notificationCondition: null,
  isPlaceholder: true,
}
