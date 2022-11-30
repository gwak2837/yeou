import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jwt = req.query.jwt

  if (!jwt) return res.status(400).json({ error: 'Invalid jwt' })

  return res.status(200).json({ user: { name: 'username1' } })
}
