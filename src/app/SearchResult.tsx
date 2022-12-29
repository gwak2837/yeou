import { isError, useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { ChangeEvent, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { fetchWithJWT } from '../common/utils'
import { Product } from './SearchForm'

type Props = {
  product: Product
}

export default function SearchResult({ product }: Props) {
  return (
    <>
      <pre className="border-2 border-slate-300 overflow-x-auto">
        {JSON.stringify(product, null, 2)}
      </pre>
      <Image src={product.imageUrl} alt="cover" width="300" height="300" />
      {product.creditCards?.map((card, i) => (
        <div key={i}>
          <div>{card.discount}</div>
          <div className="flex gap-2">
            {card.companies.map((company, i) => (
              <Image key={i} src={company} alt="cover" width="30" height="30" />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
