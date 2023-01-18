'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { Product, ProductPlaceholder, productPlaceholder } from '../common/model'
import { fetchWithJWT, formatKRPrice, toastError } from '../common/utils'
import LoadingSpinner from '../components/LoadingSpinner'
import NotificationForm from './NotificationForm'
import SearchResult from './SearchResult'

type Form = {
  url: string
}

export default function SearchForm() {
  // Form
  const validURL = getValidURL(useSearchParams().get('url'))
  const {
    formState: { errors, isDirty },
    handleSubmit,
    register,
  } = useForm<Form>({
    defaultValues: { url: validURL },
    delayError: 500,
  })

  // Query
  const [enabled, setEnabled] = useState(Boolean(validURL))
  const [encodedURL, setEncodedURL] = useState(encodeURIComponent(validURL))

  const {
    data: product,
    error,
    isFetching,
  } = useQuery<Product>({
    queryKey: ['product', encodedURL],
    queryFn: async ({ signal }) => fetchWithJWT(`/product?url=${encodedURL}`, { signal }),
    enabled,
    placeholderData: productPlaceholder,
    keepPreviousData: true,
    onError: (error) => {
      setEnabled(false)
      toastError(error as Error)
    },
    onSuccess: () => setEnabled(false),
    retry: false,
  })

  const queryClient = useQueryClient()

  function searchProduct({ url }: Form) {
    const encodedURL = encodeURIComponent(getValidURL(url))

    if (isFetching) {
      queryClient.cancelQueries({ queryKey: ['product', encodedURL] })
      setEnabled(false)
    } else {
      setEnabled(true)
      setEncodedURL(encodedURL)
    }
  }

  // Share
  function shareWithKakaotalk() {
    if (!product) return

    const sharingProduct = product.isPlaceholder ? productPlaceholder : product
    const { updateTime, URL, originalPrice, minimumPrice, imageURL } = sharingProduct

    const items = []

    if (originalPrice) {
      items.push({
        item: '정가',
        itemOp: `${formatKRPrice(originalPrice)}원`,
      })
      items.push({
        item: '최대할인',
        itemOp: `${formatKRPrice(minimumPrice - originalPrice)}원`,
      })
    }

    const url = `${window.location.href.split('?')[0]}?url=${encodeURIComponent(URL)}`
    const link = { mobileWebUrl: url, webUrl: url }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      itemContent: {
        profileText: `${format(new Date(updateTime), 'y.M.d H:m')} 기준`,
        items,
        sum: '최종가',
        sumOp: `${formatKRPrice(minimumPrice)}원`,
      },
      content: {
        title: sharingProduct.name,
        description: sharingProduct.options?.map((option) => option.value).join(', '),
        imageUrl: imageURL,
        link,
      },
      // social: {
      //   likeCount: 10,
      //   commentCount: 20,
      //   sharedCount: 30,
      // },
      buttons: [{ title: '자세히 보기', link }],
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(searchProduct)}>
        <div className="m-2">
          <input
            className="w-full	p-2	border-2 border-slate-300 rounded focus:outline-fox-600 disabled:bg-slate-100"
            disabled={isFetching}
            placeholder="URL 주소를 입력해주세요"
            {...register('url', {
              required: 'URL 주소를 입력해주세요',
              pattern: {
                value:
                  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
                message: '올바른 URL 형식으로 입력해주세요',
              },
            })}
          />
        </div>
        {errors.url && <div className="text-sm text-red-600 m-2">{errors.url.message}</div>}
        <button
          className="bg-fox-700  w-full p-2 my-4 text-white font-semibold text-2xl disabled:bg-slate-300 md:rounded"
          disabled={!isFetching && !isDirty}
          type="submit"
        >
          <div className="flex gap-2 justify-center items-center">
            {isFetching && <LoadingSpinner />}
            <div>{isFetching ? '취소' : '검색'}</div>
          </div>
        </button>
      </form>

      <pre className="border-2 mx-2 my-8 p-2 border-slate-200 overflow-x-auto md:mx-0">
        {error?.toString() ?? '정상'}
      </pre>

      <div>
        <SearchResult
          product={(product ?? productPlaceholder) as ProductPlaceholder}
          isFetching={isFetching}
        />
        <NotificationForm product={(product ?? productPlaceholder) as ProductPlaceholder} />
        <div className="sticky bottom-0 z-30 grid grid-cols-2 gap-2 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] ">
          <button
            className="bg-fox-700/90 text-white rounded font-semibold text-xl text-center p-3 w-full md:rounded hover:bg-fox-800 active:bg-fox-800 backdrop-blur-sm disabled:bg-slate-300"
            disabled={isFetching}
            onClick={shareWithKakaotalk}
          >
            공유하기
          </button>
          <button
            className="bg-fox-700/90 text-white rounded break-keep font-semibold text-xl text-center p-3 w-full md:rounded hover:bg-fox-800 active:bg-fox-800 backdrop-blur-sm disabled:bg-slate-300"
            disabled={isFetching}
            onClick={() => window.open(product?.affiliateLink ?? product?.URL, '_blank')}
          >
            구매하기
          </button>
        </div>
      </div>
    </>
  )
}

function getValidURL(input: string | null) {
  if (!input) return ''

  try {
    const validURL = new URL(input)
    const hostname = validURL.hostname

    if (hostname === 'www.coupang.com') {
      const searchParams = new URLSearchParams(validURL.search)
      const newSearchParams: any = {}
      const venderItemId = searchParams.get('vendorItemId')
      const itemId = searchParams.get('itemId')
      if (venderItemId) newSearchParams.vendorItemId = venderItemId
      if (itemId) newSearchParams.itemId = itemId
      validURL.search = new URLSearchParams(newSearchParams).toString()
    } else if (hostname === 'link.coupang.com') {
      validURL.search = ''
    } else if (hostname === 'ohou.se') {
      toast.error('지원 예정입니다')
      return ''
    } else if (hostname === 'prod.danawa.com') {
      toast.error('지원 예정입니다')
      return ''
    } else {
      toast.error('지원하지 않는 URL 주소입니다')
      return ''
    }

    validURL.searchParams.sort()
    return validURL.toString()
  } catch (error) {
    return ''
  }
}
