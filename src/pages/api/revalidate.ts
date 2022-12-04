import { NextApiRequest, NextApiResponse } from 'next'

import { REVALIDATION_KEY } from '../../common/constants'
import rateLimit from '../../common/rate-limit'

const limiter = rateLimit({
  interval: 1_000,
  uniqueTokenPerInterval: 1_000,
})

let isRunning = false

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.url
  const key = req.query.key

  if (!key || !url || typeof url !== 'string')
    return res.status(400).json({ error: 'Invalid request' })

  if (req.query.key !== REVALIDATION_KEY)
    return res.status(401).json({ error: 'Invalid revalidation key' })

  try {
    await limiter.check(res, 1, 'CACHE_TOKEN')
  } catch (error) {
    return res.status(429).json({ error: 'Rate limit exceeded' })
  }

  if (isRunning) return res.status(429).json({ error: 'Rate limit exceeded' })

  isRunning = true

  try {
    await res.revalidate(url)
    res.json({ revalidated: true })
  } catch (err) {
    res.status(500).send('Error revalidating')
  }

  isRunning = false
}
