'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Product, ProductPlaceholder, productPlaceholder } from '../common/model'
import { fetchWithJWT, toastError } from '../common/utils'
import LoadingSpinner from '../components/LoadingSpinner'
import NotificationForm from './NotificationForm'
import SearchResult from './SearchResult'

type Form = {
  productURL: string
}

export default function SearchForm() {
  // Form
  const {
    formState: { errors, isDirty },
    handleSubmit,
    register,
  } = useForm<Form>({
    defaultValues: { productURL: '' },
    delayError: 500,
  })

  // Query
  const [enabled, setEnabled] = useState(false)
  const [productURLAsKey, setProductURLAsKey] = useState('')

  const {
    data: product,
    error,
    isFetching,
  } = useQuery<Product>({
    queryKey: ['product', productURLAsKey],
    queryFn: async ({ signal }) =>
      fetchWithJWT(`/product?url=${encodeURIComponent(productURLAsKey)}`, { signal }),
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

  function searchProduct({ productURL }: Form) {
    if (isFetching) {
      queryClient.cancelQueries({ queryKey: ['product', productURL] })
      setEnabled(false)
      setProductURLAsKey('')
    } else {
      setEnabled(true)
      setProductURLAsKey(productURL)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(searchProduct)}>
        <div className="m-2">
          <input
            className="w-full	p-2	border-2 border-slate-300 rounded focus:outline-fox-600 disabled:bg-slate-100 disabled:cursor-not-allowed"
            disabled={isFetching}
            placeholder="URL 주소를 입력해주세요"
            {...register('productURL', {
              required: 'URL 주소를 입력해주세요',
              pattern: {
                value:
                  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
                message: '올바른 URL 형식으로 입력해주세요',
              },
            })}
          />
        </div>
        {errors.productURL && (
          <div className="text-sm text-red-600 mt-2">{errors.productURL.message}</div>
        )}
        <button
          className="bg-fox-700  w-full p-2 my-4 text-white font-semibold text-2xl disabled:bg-slate-300 disabled:cursor-not-allowed md:rounded"
          disabled={!isDirty}
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

      <NotificationForm product={(product ?? productPlaceholder) as ProductPlaceholder} />
      <SearchResult
        product={(product ?? productPlaceholder) as ProductPlaceholder}
        isFetching={isFetching}
      />
    </>
  )
}
