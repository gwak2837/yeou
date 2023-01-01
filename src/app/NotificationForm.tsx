import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, memo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { NumericFormat } from 'react-number-format'

import { ProductPlaceholder } from '../common/model'
import { fetchWithJWT, formatKoreaPrice, toastError } from '../common/utils'
import LoadingSpinner from '../components/LoadingSpinner'
import XIcon from '../svgs/x.svg'

type Props = {
  product: ProductPlaceholder
}

type Condition = {
  prices: Price[]
  hasCardDiscount: boolean
  hasCouponDiscount: boolean
  canBuy: boolean
}

type Price = {
  limit: number
  fluctuation: 'more' | 'less'
  unit: number
}

export default memo(NotificationForm)

function NotificationForm({ product }: Props) {
  const condition = product.notificationCondition
  const { isPlaceholder } = product

  // Notification subscription inputs
  const {
    formState: { isDirty },
    handleSubmit,
    setValue,
    watch,
  } = useForm<Condition>({
    defaultValues: {
      prices: condition?.prices ?? [],
      hasCardDiscount: condition?.hasCardDiscount ?? false,
      hasCouponDiscount: condition?.hasCouponDiscount ?? false,
      canBuy: condition?.canBuy ?? false,
    },
  })

  const setValueDirty = (
    name: Parameters<typeof setValue>[0],
    value: Parameters<typeof setValue>[1]
  ) => setValue(name, value, { shouldDirty: true })

  const prices = watch('prices')
  const hasCardDiscount = watch('hasCardDiscount')
  const hasCouponDiscount = watch('hasCouponDiscount')
  const canBuy = watch('canBuy')

  const isConditionEmpty = prices.length === 0 && !hasCardDiscount && !hasCouponDiscount && !canBuy

  // Toggle notification condition
  const {
    isLoading: isSubscriptionLoading,
    isError: isSubscriptionError,
    mutate,
  } = useMutation<any, any, any>({
    mutationFn: ({ productId, condition }) =>
      fetchWithJWT(`/product/${productId}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: condition ? JSON.stringify(condition) : null,
      }),
    onError: toastError,
    onSuccess: (data) => {
      console.log('👀 - data', data)
    },
  })

  function toggleSubscription(condition: Condition) {
    mutate({
      productId: product.id,
      condition: isConditionEmpty ? null : condition,
    })
  }

  // Price limit condition
  const limitInput = useRef<HTMLInputElement>(null)
  const unitInput = useRef<HTMLInputElement>(null)

  function createPriceNotification(e: ChangeEvent<HTMLSelectElement>) {
    if (!limitInput.current || !unitInput.current) return

    const limit = +limitInput.current.value.replaceAll(',', '')
    const unit = +unitInput.current.value.replaceAll(',', '')
    const fluctuation = e.target.value as 'more' | 'less'
    e.target.value = ''

    if (!limit) {
      return toast.error('지정가를 입력해주세요')
    } else if (!unit) {
      return toast.error('단위를 입력해주세요')
    } else if (unit < 100) {
      return toast.error('단위가 100원 미만입니다')
    } else if (unit % 100 !== 0) {
      return toast.error('단위는 100원 단위로 입력해주세요')
    } else if (
      prices.some((p) => p.limit === +limit && p.unit === +unit && p.fluctuation === fluctuation)
    ) {
      return toast.error('이미 같은 조건의 알림이 존재합니다')
    }

    setValueDirty('prices', [...prices, { limit: +limit, unit: +unit, fluctuation }])
  }

  function deletePriceNotification(price: Price) {
    const selectedPrice = (p: Price) =>
      p.limit !== price.limit || p.unit !== price.unit || p.fluctuation !== price.fluctuation
    return () => setValueDirty('prices', prices.filter(selectedPrice))
  }

  // Other condition
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

  // Style
  const isPlaceholderStyle = isPlaceholder ? 'border-slate-200' : 'border-transparent'

  return (
    <form
      className={`mx-2 my-8 border-2 ${isPlaceholderStyle} md:mx-0`}
      onSubmit={handleSubmit(toggleSubscription)}
    >
      {isPlaceholder && <h3 className="border-b-2 border-slate-200 text-center p-2">예시 화면</h3>}
      <div className="flex gap-2 items-center w-full  my-4 px-2 whitespace-nowrap flex-wrap">
        <select
          className="p-2 border w-28 focus:outline-fox-600 cursor-pointer"
          onChange={createCondition}
        >
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
                    ref={limitInput}
                    {...props}
                  />
                )}
                isAllowed={({ value }) => {
                  if (+value < 0) {
                    toast.error('지정가가 0원 미만일 수 없습니다')
                    return false
                  } else if (+value > 1_000_000_000) {
                    toast.error('지정가가 10억원을 초과할 수 없습니다')
                    return false
                  }
                  return true
                }}
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
                    ref={unitInput}
                    {...props}
                  />
                )}
                isAllowed={({ value }) => {
                  if (+value >= 10_000_000) {
                    toast.error('단위가 1천만원 이상일 수 없습니다')
                    return false
                  }
                  return true
                }}
                thousandsGroupStyle="thousand"
                thousandSeparator=","
              />
              <span>원씩</span>
            </div>
            <div className="flex gap-2 items-center">
              <select
                className="p-2 border w-20 focus:outline-fox-600 cursor-pointer"
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

      {!isConditionEmpty && (
        <ul className="my-4 grid gap-2">
          {prices.map((price) => (
            <li
              key={`${price.limit}-${price.unit}-${price.fluctuation}`}
              className="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-100"
              onClick={deletePriceNotification(price)}
            >
              <XIcon width="1rem" />
              <div>
                제품 가격이 {formatKoreaPrice(price.limit)}원부터 {formatKoreaPrice(price.unit)}원씩{' '}
                {price.fluctuation === 'more' ? '상승' : '하락'}할 때마다
              </div>
            </li>
          ))}
          {hasCardDiscount && (
            <li
              className="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-100"
              onClick={() => setValueDirty('hasCardDiscount', false)}
            >
              <XIcon width="1rem" />
              <div>카드 할인이 제품에 생겼을 때</div>
            </li>
          )}
          {hasCouponDiscount && (
            <li
              className="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-100"
              onClick={() => setValueDirty('hasCouponDiscount', false)}
            >
              <XIcon width="1rem" />
              <div>쿠폰 할인이 제품에 생겼을 때</div>
            </li>
          )}
          {canBuy && (
            <li
              className="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-100"
              onClick={() => setValueDirty('canBuy', false)}
            >
              <XIcon width="1rem" />
              <div>품절된 제품이 재입고됐을 때</div>
            </li>
          )}
        </ul>
      )}

      <button
        className="bg-fox-700 my-4 p-2 w-full text-white font-semibold text-xl disabled:bg-slate-300 disabled:cursor-not-allowed"
        disabled={isPlaceholder || !isDirty || isSubscriptionLoading}
        type="submit"
      >
        <div className="flex gap-2 justify-center items-center">
          {isSubscriptionLoading && <LoadingSpinner />}
          <div>{isConditionEmpty ? '알림끊기' : '알림받기'}</div>
        </div>
      </button>
    </form>
  )
}
