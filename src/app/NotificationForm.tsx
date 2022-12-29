import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { NumericFormat } from 'react-number-format'

import { fetchWithJWT, formatKoreaPrice } from '../common/utils'
import { Product } from './SearchForm'

type Props = {
  product: Product
}

type Input = Product['notificationCondition']
type Price = Input['prices'][number]

export default function NotificationForm({ product }: Props) {
  const condition = product.notificationCondition

  // Notification subscription inputs
  const {
    formState: { isDirty },
    handleSubmit,
    setValue,
    watch,
  } = useForm<Input>({
    defaultValues: {
      prices: condition.prices,
      hasCardDiscount: condition.hasCardDiscount ?? false,
      hasCouponDiscount: condition.hasCouponDiscount ?? false,
      canBuy: condition.canBuy ?? false,
    },
  })

  const setValueDirty = (name: any, value: any) => setValue(name, value, { shouldDirty: true })

  const prices = watch('prices')
  const hasCardDiscount = watch('hasCardDiscount')
  const hasCouponDiscount = watch('hasCouponDiscount')
  const canBuy = watch('canBuy')

  // Toggle notification
  const {
    isLoading: isSubscriptionLoading,
    isError: isSubscriptionError,
    mutate,
  } = useMutation<any, any, any>({
    mutationFn: (productId) =>
      fetchWithJWT(`/product/${productId}/subscribe`, {
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify([condition.current]),
      }),
    onSuccess: () => {},
  })

  function toggleSubscription(input: Input) {
    mutate(product.id)
  }

  // Price limit notification
  const [limit, setLimit] = useState('')
  const [unit, setUnit] = useState('')

  function formatLimit(e: ChangeEvent<HTMLInputElement>) {
    const price = +e.target.value.replaceAll(',', '')

    if (price < 0) return (e.target.value = '0')
    if (price > 1_000_000_000) return (e.target.value = '1,000,000,000')

    e.target.value = formatKoreaPrice(price)
  }

  function formatUnit(e: ChangeEvent<HTMLInputElement>) {
    const price = +e.target.value.replaceAll(',', '')

    if (price < 0) return (e.target.value = '0')
    if (price > 9_999_999) return (e.target.value = '9,999,999')

    e.target.value = formatKoreaPrice(price)
  }

  function createPriceNotification(e: ChangeEvent<HTMLSelectElement>) {
    // if (!limitInput.current || !unitInput.current) return
    // const limit = +limitInput.current.value.replaceAll(',', '')
    // if (!limit) {
    //   e.target.value = ''
    //   return toast.error('지정가를 입력해주세요')
    // }
    // const unit = +unitInput.current.value.replaceAll(',', '')
    // if (!unit) {
    //   e.target.value = ''
    //   return toast.error('단위를 입력해주세요')
    // }
    // const fluctuation = e.target.value as 'more' | 'less'
    // e.target.value = ''
    // const hasSameCondition = prices.some(
    //   (p) => p.limit === +limit && p.unit === +unit && p.fluctuation === fluctuation
    // )
    // if (hasSameCondition) return toast.error('이미 같은 조건의 알림이 존재합니다')
    // setValue('prices', [...prices, { limit: +limit, fluctuation, unit: +unit }])
  }

  function deletePriceNotification(price: Price) {
    const selectedPrice = (p: Price) =>
      p.limit !== price.limit || p.unit !== price.unit || p.fluctuation !== price.fluctuation
    return () => setValueDirty('prices', prices.filter(selectedPrice))
  }

  // Other notification
  const [notificationType, setNotificationType] = useState('price')

  function createCondition(e: ChangeEvent<HTMLSelectElement>) {
    setNotificationType(e.target.value)

    switch (e.target.value) {
      case 'price':
        break
      case 'card-discount':
        setValueDirty('hasCardDiscount', true)
        break
      case 'coupon-discount':
        setValueDirty('hasCouponDiscount', true)
        break
      case 'out-of-order':
        setValueDirty('canBuy', true)
        break
      default:
        break
    }
  }

  return (
    <form onSubmit={handleSubmit(toggleSubscription)}>
      <div className="flex gap-2 items-center w-full  my-4 px-2 whitespace-nowrap flex-wrap">
        <select className="p-2 border w-28 focus:outline-fox-600" onChange={createCondition}>
          <option value="price">제품 가격이</option>
          <option value="card-discount">카드 할인이</option>
          <option value="coupon-discount">쿠폰 할인이</option>
          <option value="out-of-order">품절된 제품이</option>
        </select>
        {notificationType === 'price' ? (
          <>
            <div className="flex gap-2 items-center">
              <NumericFormat
                customInput={(props) => (
                  <input
                    className="border p-2 w-32 focus:outline-fox-600"
                    inputMode="numeric"
                    placeholder="지정가"
                    {...props}
                  />
                )}
                thousandsGroupStyle="thousand"
                thousandSeparator=","
              />
              <span>원부터</span>
            </div>
            <div className="flex gap-2 items-center">
              <NumericFormat
                customInput={(props) => (
                  <input
                    className="border p-2 w-24 focus:outline-fox-600"
                    inputMode="numeric"
                    placeholder="단위"
                    {...props}
                  />
                )}
                // suffix="00"
                thousandsGroupStyle="thousand"
                thousandSeparator=","
              />
              <span>원 단위로</span>
            </div>
            <div className="flex gap-2 items-center">
              <select
                className="p-2 border w-20 focus:outline-fox-600"
                defaultValue=""
                name="fluctuation"
                onChange={createPriceNotification}
              >
                <option disabled value="">
                  (선택)
                </option>
                <option value="more">상승</option>
                <option value="less">하락</option>
              </select>
              <span>할 때마다</span>
            </div>
          </>
        ) : notificationType === 'card-discount' || notificationType === 'coupon-discount' ? (
          <span>제품에 생겼을 때</span>
        ) : notificationType === 'out-of-order' ? (
          <span>재입고됐을 때</span>
        ) : (
          <span>???</span>
        )}
      </div>

      {(hasCardDiscount || hasCouponDiscount || canBuy) && (
        <ul className="my-4 grid gap-2">
          {prices.map((price) => (
            <li
              key={`${price.limit}${price.unit}${price.fluctuation}`}
              className="cursor-pointer p-2 hover:bg-slate-100"
              onClick={deletePriceNotification(price)}
            >
              (X) 제품 가격이 {formatKoreaPrice(price.limit)}원부터 {formatKoreaPrice(price.unit)}원
              단위로 {price.fluctuation === 'more' ? '상승' : '하락'}할 때마다
            </li>
          ))}
          {hasCardDiscount && (
            <li
              className="cursor-pointer p-2 hover:bg-slate-100"
              onClick={() => setValueDirty('hasCardDiscount', false)}
            >
              (X) 카드 할인이 제품에 생겼을 때
            </li>
          )}
          {hasCouponDiscount && (
            <li
              className="cursor-pointer p-2 hover:bg-slate-100"
              onClick={() => setValueDirty('hasCouponDiscount', false)}
            >
              (X) 쿠폰 할인이 제품에 생겼을 때
            </li>
          )}
          {canBuy && (
            <li
              className="cursor-pointer p-2 hover:bg-slate-100"
              onClick={() => setValueDirty('canBuy', false)}
            >
              (X) 품절된 제품이 재입고됐을 때
            </li>
          )}
        </ul>
      )}

      <button
        className="bg-fox-700 p-2 w-full text-white font-semibold text-xl disabled:bg-slate-300 disabled:cursor-not-allowed"
        disabled={!isDirty || isSubscriptionLoading}
        type="submit"
      >
        {isSubscriptionLoading && <div>로딩스피너</div>} {'알림끊기/알림받기'}
      </button>
    </form>
  )
}
