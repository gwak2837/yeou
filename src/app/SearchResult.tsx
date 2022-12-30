import { isError, useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { ChangeEvent, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { fetchWithJWT, formatKoreaPrice } from '../common/utils'
import CoinIcon from '../svgs/coin.svg'
import { Product } from './SearchForm'

type Props = {
  product: Product
}

export default function SearchResult({ product }: Props) {
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-2 m-2">
        <Image src={product.imageUrl} alt="cover" width="384" height="384" />
        <div>
          <h3 className="text-xl my-2">{product.name}</h3>
          <div className="my-2">
            <h5 className="text-sm text-slate-400 line-through">
              {formatKoreaPrice(
                product.originalPrice ?? product.salePrice ?? product.couponPrice ?? 0
              )}
              원
            </h5>
            <h1 className="text-4xl text-fox-700">
              {product.minimumPrice ? `${formatKoreaPrice(product.minimumPrice)}원` : '무료'}
            </h1>
            <div className="flex gap-2 my-2">
              {product.reward && (
                <>
                  <CoinIcon width="1rem" />
                  <h4>{formatKoreaPrice(product.reward)}원</h4>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <pre className="border-2 border-slate-300 overflow-x-auto">
        {JSON.stringify(product, null, 2)}
      </pre>
    </>
  )
}
