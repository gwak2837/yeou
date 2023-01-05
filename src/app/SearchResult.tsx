'use client'

import Image from 'next/image'
import { memo } from 'react'

import { ProductPlaceholder, productPlaceholder } from '../common/model'
import { formatKoreaPrice } from '../common/utils'
import CoinIcon from '../svgs/coin.svg'
import CreditCardIcon from '../svgs/credit-card.svg'
import PriceIcon from '../svgs/price.svg'
import SaleIcon from '../svgs/sale.svg'

type Props = {
  product: ProductPlaceholder
  isFetching: boolean
}

export default memo(SearchResult)

function SearchResult({ product, isFetching }: Props) {
  const {
    URL,
    affiliateLink,
    originalPrice,
    salePrice,
    couponPrice,
    cards,
    maximumCardDiscount,
    coupons,
    reward,
    maximumDiscount,
    minimumPrice,
    imageURL,
    isOutOfStock,
    isPlaceholder,
  } = product
  const couponOrSalePrice = couponPrice ?? salePrice
  const originalOrCouponOrSalePrice = originalPrice ?? couponOrSalePrice

  function shareWithKakaotalk() {
    const sharingProduct = isPlaceholder ? productPlaceholder : product
    const originalPrice = sharingProduct.originalPrice
    const minimumPrice = sharingProduct.minimumPrice

    const items = []

    if (originalPrice) {
      items.push({
        item: '정가',
        itemOp: `${formatKoreaPrice(originalPrice)}원`,
      })
      items.push({
        item: '최대할인',
        itemOp: `${formatKoreaPrice(minimumPrice - originalPrice)}원`,
      })
    }

    const url = `${window.location.href.split('?')[0]}?url=${encodeURIComponent(URL)}`
    const link = { mobileWebUrl: url, webUrl: url }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: sharingProduct.name,
        description: sharingProduct.options?.map((option) => option.value).join(', '),
        imageUrl: imageURL,
        link,
      },
      itemContent: {
        items,
        sum: '최종가',
        sumOp: `${formatKoreaPrice(minimumPrice)}원`,
      },
      // social: {
      //   likeCount: 10,
      //   commentCount: 20,
      //   sharedCount: 30,
      // },
      buttons: [{ title: '자세히 보기', link }],
    })
  }

  // Style
  const isPlaceholderFetchingStyle = isFetching
    ? isPlaceholder
      ? 'animate-[skeletonPlaceholder_2s_ease_infinite]'
      : 'animate-[skeleton_2s_ease_infinite]'
    : isPlaceholder
    ? 'border-slate-200'
    : 'border-transparent'
  const isFetchingStyle = isFetching ? 'animate-[skeletonPlaceholder_2s_ease_infinite]' : ''
  const isRewardStyle = maximumDiscount === reward ? '' : 'text-slate-400 line-through'
  const isCardStyle = maximumDiscount === maximumCardDiscount ? '' : 'text-slate-400 line-through'
  const isOutOfStockStyle = isOutOfStock
    ? 'text-slate-400 line-through text-2xl'
    : 'text-fox-700 text-4xl'

  return (
    <div className="my-8">
      <div className={`border-2 m-2 ${isPlaceholderFetchingStyle} md:mx-0`}>
        {isPlaceholder && (
          <h3 className={`border-b-2 border-slate-200 text-center p-2 ${isFetchingStyle}`}>
            예시 화면
          </h3>
        )}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-2 m-2">
          <Image src={product.imageURL} alt="cover" width="384" height="384" className="mx-auto" />
          <div>
            <h3 className="text-xl my-2">{product.name}</h3>
            <h4 className="my-2">{product.options?.map((option) => option.value).join(', ')}</h4>
            <a href={product.reviewURL} target="_blank" rel="noreferrer">
              <h5 className="text-sm ">{product.reviewCount}</h5>
            </a>
            <div className="my-2">
              {originalOrCouponOrSalePrice && originalOrCouponOrSalePrice !== minimumPrice && (
                <h5 className="text-sm text-slate-400 line-through">
                  {formatKoreaPrice(originalOrCouponOrSalePrice)}원
                </h5>
              )}
              <h1 className={isOutOfStockStyle}>
                {formatKoreaPrice(minimumPrice)}원 {isOutOfStock && '(품절)'}
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
                  {originalPrice && (
                    <tr className={couponOrSalePrice ? 'text-slate-400 line-through' : ''}>
                      <td className="flex gap-2 items-center">
                        <PriceIcon width="1rem" /> 정가
                      </td>
                      <td className="text-right">{formatKoreaPrice(originalPrice)}원</td>
                    </tr>
                  )}
                  {couponOrSalePrice && (
                    <tr>
                      <td className="flex gap-2 items-center">
                        <SaleIcon width="1rem" /> 할인가
                      </td>
                      <td className="text-right">{formatKoreaPrice(couponOrSalePrice)}원</td>
                    </tr>
                  )}
                  {reward && (
                    <tr className={isRewardStyle}>
                      <td className="flex gap-2 items-center">
                        <CoinIcon width="1rem" /> 적립금
                      </td>
                      <td className="text-right">-{formatKoreaPrice(reward)}원</td>
                    </tr>
                  )}
                  {maximumCardDiscount && (
                    <tr className={isCardStyle}>
                      <td className="flex gap-2 items-center">
                        <CreditCardIcon width="1rem" /> 카드할인
                      </td>
                      <td className="text-right">-{formatKoreaPrice(maximumCardDiscount)}원</td>
                    </tr>
                  )}
                  <tr className="text-fox-700">
                    <td className="flex gap-2 items-center">최종가</td>
                    <td className="text-right">
                      {formatKoreaPrice((couponOrSalePrice ?? 0) - (maximumDiscount ?? 0))}원{' '}
                      {isOutOfStock && '(품절)'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="m-2">
          {cards && (
            <>
              <div className="border w-full my-4" />
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
          {coupons && (
            <>
              <br />
              <h3 className="text-xl">쿠폰 할인</h3>
              <pre className="border-2 border-slate-300 overflow-x-auto">
                {JSON.stringify(coupons, null, 2)}
              </pre>
            </>
          )}
        </div>
        <style jsx>{`
          .t td {
            padding: 0.5rem;
          }
          .t2 td {
            text-align: center;
          }
        `}</style>
      </div>
      <div className="sticky bottom-0 grid grid-cols-2 gap-2 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <button
          className="bg-fox-700/90 text-white rounded font-semibold text-xl text-center p-3 w-full md:rounded hover:bg-fox-800 active:bg-fox-800 backdrop-blur-sm disabled:bg-slate-300 disabled:cursor-not-allowed"
          disabled={isFetching}
          onClick={shareWithKakaotalk}
        >
          공유하기
        </button>
        <button
          className="bg-fox-700/90 text-white rounded break-keep font-semibold text-xl text-center p-3 w-full md:rounded hover:bg-fox-800 active:bg-fox-800 backdrop-blur-sm disabled:bg-slate-300 disabled:cursor-not-allowed"
          disabled={isFetching}
          onClick={() => window.open(affiliateLink ?? URL, '_blank')}
        >
          구매하기
        </button>
      </div>
    </div>
  )
}
