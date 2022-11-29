import { CANONICAL_URL } from '../../common/constants'

export default function Head() {
  const title = '나의 새소식'
  const description = '가격 변동 알리미2'

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/images/og-image.webp" />
      <meta property="og:image:alt" content="/images/og-image.webp" />
      <meta property="og:url" content={`${CANONICAL_URL}${/* pathname */ ''}`} />
    </>
  )
}
