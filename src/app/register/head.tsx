import { CANONICAL_URL } from '../../common/constants'

export default function RegisterHead() {
  const title = '새소식 가입하기'
  const description = '새소식에 가입해서 가격 변동 알림을 받아보세요'

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/images/og-image.webp" />
      <meta property="og:image:alt" content="/images/og-image.webp" />
      <meta property="og:url" content={`${CANONICAL_URL}/register`} />
    </>
  )
}
