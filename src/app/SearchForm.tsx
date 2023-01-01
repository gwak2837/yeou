'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
    formState: { isDirty },
    handleSubmit,
    register,
  } = useForm<Form>({
    defaultValues: { productURL: '' },
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
        <div className="p-2">
          <input
            className="w-full	p-2	border-2 border-slate-300 focus:outline-fox-600 disabled:bg-slate-100 disabled:cursor-not-allowed"
            disabled={isFetching}
            placeholder="URL 주소를 입력해주세요"
            {...register('productURL', { required: true })}
          />
        </div>
        <button
          className="bg-fox-700 w-full p-2 my-4 text-white font-semibold text-2xl disabled:bg-slate-300 disabled:cursor-not-allowed"
          disabled={!isDirty}
          type="submit"
        >
          <div className="flex gap-2 justify-center items-center">
            {isFetching && <LoadingSpinner />}
            <div>{isFetching ? '취소' : '검색'}</div>
          </div>
        </button>
      </form>

      {error && <pre className="border-2 border-slate-300 overflow-x-auto">{error.toString()}</pre>}

      <NotificationForm product={(product ?? productPlaceholder) as ProductPlaceholder} />
      <SearchResult
        product={(product ?? productPlaceholder) as ProductPlaceholder}
        isFetching={isFetching}
      />
    </>
  )
}
