import { CANONICAL_URL } from '../../../common/constants'

export default function LoginHead() {
  const title = '로그인 - 새소식'
  const description = '새소식에서 여러 사이트 상품 관련 알림을 받아보세요'

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/images/og-image.webp" />
      <meta property="og:image:alt" content="/images/og-image.webp" />
      <meta property="og:url" content={`${CANONICAL_URL}/login`} />
    </>
  )
}
