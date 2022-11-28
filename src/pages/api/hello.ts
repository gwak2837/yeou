import { load } from 'cheerio'
import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const productURL = req.query.productURL

  if (!productURL || typeof productURL !== 'string')
    return res.status(400).json({ message: 'Please input productURL' })

  let response
  try {
    response = await fetch(productURL)
  } catch (err) {
    return res.status(400).json({ message: 'Failed fetching HTML' })
  }

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(productURL)
  await page.waitForSelector('.prod-coupon-download-content', { timeout: 5000 })

  const content = await page.content()

  const $ = load(content)
  // const $ = load(await response.text())

  const price = $('.prod-sale-price > .total-price').text().trim()
  const price2 = $('.prod-coupon-price > .total-price').text().trim()
  const coupon = $('.prod-coupon-download-content').html()
  const card = $('.benefit-label').text()
  const imageUrl = $('.prod-image__detail').attr('src')
  const reviewCount = $('#prod-review-nav-link > span.count').text()
  const name = $('.prod-buy-header__title').text()

  res.status(200).json({
    name,
    price,
    price2,
    coupon,
    card,
    imageUrl: `https:${imageUrl}`,
    reviewCount,
  })
}
