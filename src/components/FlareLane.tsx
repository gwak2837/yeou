'use client'

import Script from 'next/script'
import { NEXT_PUBLIC_FLARE_LANE_PROJECT_ID } from '../common/constants'

export default function FlareLane() {
  return (
    <Script
      id="flare-lane"
      src="https://cdn.flarelane.com/WebSDK.js"
      strategy="lazyOnload"
      onLoad={() => window.FlareLane.initialize({ projectId: NEXT_PUBLIC_FLARE_LANE_PROJECT_ID })}
    />
  )
}
