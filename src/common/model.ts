export type Product = {
  id: string
  name: string
  options?: {
    title: string
    value: string
  }[]
  updateTime: string
  URL: string
  affiliateLink?: string
  originalPrice?: number
  salePrice?: number
  couponPrice?: number
  cards?: {
    company: string
    absolute: number
    relative: number
    onlyWOW: boolean
  }[]
  maximumCardDiscount?: number
  coupons?: {
    discount: string
    condition: string
  }[]
  reward?: number
  maximumDiscount?: number
  minimumPrice: number
  imageURL: string
  reviewURL: string
  reviewCount: string
  isOutOfStock: boolean
  notificationCondition?: {
    prices?:
      | {
          limit: number
          fluctuation: '상승' | '하락'
          unit: number
        }[]
    hasCardDiscount: boolean
    hasCouponDiscount: boolean
    canBuy: boolean
  }
  isPlaceholder: boolean
}

export type ProductPlaceholder = Product & { isPlaceholder: boolean }

export const productPlaceholder: ProductPlaceholder = {
  id: '1',
  name: 'Apple 2022 아이패드 10세대',
  options: [
    { title: '색상', value: '블루' },
    { title: '저장용량 × 태블릿 연결성', value: '64GB × Wi-Fi' },
  ],
  updateTime: new Date(2022, 11, 31, 15, 21).toISOString(),
  URL: '',
  affiliateLink: 'https://link.coupang.com/a/Ksgbf',
  originalPrice: 679000,
  salePrice: undefined,
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
  coupons: undefined,
  reward: 31145,
  maximumDiscount: 62290,
  minimumPrice: 560610,
  imageURL:
    'https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2363422884128619-2e83f9a6-d11d-4cb5-813d-5d7de0751eb0.jpg',
  reviewURL:
    'https://www.coupang.com/vp/products/6912124565?itemId=16661691663&itemsCount=36&rank=3&vendorItemId=83845338385#sdpReview',
  reviewCount: '111개 상품평',
  isOutOfStock: false,
  notificationCondition: {
    hasCardDiscount: true,
    hasCouponDiscount: false,
    canBuy: true,
  },
  isPlaceholder: true,
}
