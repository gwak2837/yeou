import { CANONICAL_URL } from '../../common/constants'

export default function Head() {
  const title = 'OAuth 인증 - 새소식'
  const description = 'OAuth 로그인 중이에요'

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/images/og-image.webp" />
      <meta property="og:image:alt" content="/images/og-image.webp" />
      <meta property="og:url" content={`${CANONICAL_URL}/oauth`} />
    </>
  )
}
