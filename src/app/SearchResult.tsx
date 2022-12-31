import { isError, useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { ChangeEvent, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { fetchWithJWT, formatKoreaPrice } from '../common/utils'
import CoinIcon from '../svgs/coin.svg'
import CreditCardIcon from '../svgs/credit-card.svg'
import PriceIcon from '../svgs/price.svg'
import SaleIcon from '../svgs/sale.svg'
import { Product } from './SearchForm'

type Props = {
  product: Product
}

export default function SearchResult({ product }: Props) {
  const saleOrCouponPrice = product.couponPrice ?? product.salePrice
  const originalPrice = product.originalPrice ?? saleOrCouponPrice
  const { cards, coupons, maximumDiscount, minimumPrice, isOutOfStock } = product

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-2 m-2">
        <Image src={product.imageUrl} alt="cover" width="384" height="384" className="mx-auto" />
        <div>
          <h3 className="text-xl my-2">{product.name}</h3>
          <h4 className="my-2">{product.options?.map((option) => option.value).join(', ')}</h4>
          <a href={product.reviewURL} target="_blank" rel="noreferrer">
            <h5 className="text-sm ">{product.reviewCount}</h5>
          </a>
          <div className="my-2">
            {originalPrice && originalPrice !== minimumPrice && (
              <h5 className="text-sm text-slate-400 line-through">
                {formatKoreaPrice(originalPrice)}원
              </h5>
            )}
            <h1
              className={
                'text-4xl ' + (isOutOfStock ? 'text-slate-400 line-through' : 'text-fox-700')
              }
            >
              {isOutOfStock
                ? '품절'
                : minimumPrice === 0
                ? '무료'
                : `${formatKoreaPrice(minimumPrice)}원`}
            </h1>
            <div className="border w-full my-4" />
            <table className="w-full t">
              <thead>
                <tr className="text-center">
                  <td>항목</td>
                  <td>금액</td>
                </tr>
              </thead>
              <tbody>
                {product.originalPrice && (
                  <tr className={saleOrCouponPrice ? 'text-slate-400 line-through' : ''}>
                    <td className="flex gap-2 items-center">
                      <PriceIcon width="1rem" /> 정가
                    </td>
                    <td className="text-right">{formatKoreaPrice(product.originalPrice)}원</td>
                  </tr>
                )}
                {saleOrCouponPrice && (
                  <tr>
                    <td className="flex gap-2 items-center">
                      <SaleIcon width="1rem" /> 할인가
                    </td>
                    <td className="text-right">{formatKoreaPrice(saleOrCouponPrice)}원</td>
                  </tr>
                )}
                {maximumDiscount && (
                  <>
                    <tr
                      className={
                        maximumDiscount !== product.reward ? 'text-slate-400 line-through' : ''
                      }
                    >
                      <td className="flex gap-2 items-center">
                        <CoinIcon width="1rem" /> 적립금
                      </td>
                      <td className="text-right">-{formatKoreaPrice(product.reward ?? 0)}원</td>
                    </tr>
                    <tr
                      className={
                        maximumDiscount === product.reward ? 'text-slate-400 line-through' : ''
                      }
                    >
                      <td className="flex gap-2 items-center">
                        <CreditCardIcon width="1rem" /> 카드할인
                      </td>
                      <td className="text-right">-{formatKoreaPrice(maximumDiscount)}원</td>
                    </tr>
                  </>
                )}
                <tr className="text-fox-700">
                  <td className="flex gap-2 items-center">최종가</td>
                  <td className="text-right">
                    {formatKoreaPrice((saleOrCouponPrice ?? 0) - (maximumDiscount ?? 0))}원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="border w-full my-4" />
      {cards && (
        <>
          <h3 className="text-xl flex gap-2 items-center my-6">
            <CreditCardIcon width="1.5rem" /> 카드할인 상세
          </h3>
          <table className="w-full t t2 border">
            <thead>
              <tr className="border-b">
                <td>카드사</td>
                <td>할인률</td>
                <td>최대 할인금액</td>
                <td>비고</td>
              </tr>
            </thead>
            <tbody>
              {cards.map((card, i) => (
                <tr key={i}>
                  <td>
                    <Image
                      src={card.company}
                      alt="card company logo"
                      width="100"
                      height="100"
                      className="mx-auto"
                    />
                  </td>
                  <td>{card.relative}%</td>
                  <td>{formatKoreaPrice(card.absolute)}원</td>
                  <td>{card.onlyWOW && '와우회원 전용'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <br />
      {coupons && (
        <>
          <h3 className="text-xl">쿠폰 할인</h3>
          <pre className="border-2 border-slate-300 overflow-x-auto">
            {JSON.stringify(coupons, null, 2)}
          </pre>
        </>
      )}
      <style jsx>{`
        .t td {
          padding: 0.5rem;
        }
        .t2 td {
          text-align: center;
        }
      `}</style>
    </>
  )
}
