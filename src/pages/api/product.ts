// import { load } from 'cheerio'
import type { NextApiRequest, NextApiResponse } from 'next'
// import puppeteer from 'puppeteer-extra'
// import StealthPlugin from 'puppeteer-extra-plugin-stealth'

// import { pool } from '../../common/postgres'
// import rateLimit from '../../common/rate-limit'

// puppeteer.use(StealthPlugin())

// const limiter = rateLimit({
//   interval: 60_000,
//   uniqueTokenPerInterval: 10_000,
// })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   const productURL = req.query.productURL
  //   if (!productURL || typeof productURL !== 'string')
  //     return res.status(400).json({ error: 'Please input productURL' })
  //   try {
  //     await limiter.check(res, 60_000, 'CACHE_TOKEN')
  //   } catch (error) {
  //     return res.status(429).json({ error: 'Rate limit exceeded' })
  //   }
  //   // Headless browser
  //   const browser = await puppeteer.launch()
  //   const page = await browser.newPage()
  //   try {
  //     await page.goto(productURL)
  //   } catch (err) {
  //     return res.status(400).json({ error: 'Failed fetching HTML' })
  //   }
  //   await page.waitForSelector('.prod-coupon-download-btn')
  //   const getStyle = 'document.querySelector(".prod-coupon-download-btn").getAttribute("style")'
  //   const couponButtonStyle = await page.evaluate(getStyle)
  //   if (couponButtonStyle !== 'display: none;')
  //     await page.waitForSelector('.prod-coupon-download-content')
  //   // HTML parsing
  //   const $ = load(await page.content())
  //   const price = $('.prod-sale-price > .total-price').text().trim()
  //   const price2 = $('.prod-coupon-price > .total-price').text().trim()
  //   const coupon = $('.prod-coupon-download-content')
  //     .find('li')
  //     .toArray()
  //     .map((e) =>
  //       $(e)
  //         .find('span')
  //         .toArray()
  //         .map((e) => $(e).text())
  //     )
  //   const creditCard = $('.benefit-label > b').text()
  //   const creditCardCompanies = $('.ccid-benefit-badge__inr')
  //     .find('img')
  //     .toArray()
  //     .map((e) => $(e).attr('src'))
  //     .map((imageUrl) => `https:${imageUrl}`)
  //   const imageUrl = $('.prod-image__detail').attr('src')
  //   const reviewCount = $('#prod-review-nav-link > span.count').text()
  //   const name = $('.prod-buy-header__title').text()
  //   res.status(200).json({
  //     name,
  //     price,
  //     price2,
  //     coupon,
  //     creditCard,
  //     creditCardCompanies,
  //     imageUrl: `https:${imageUrl}`,
  //     reviewCount,
  //   })
  //   // Save result
  //   // const { rows } = await pool.query('SELECT id FROM product WHERE url = $1', [productURL])
  //   // pool.query('INSERT INTO product_history (price, product_id) values ($1, $2)', [price, rows[0].id])
}
