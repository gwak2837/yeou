import Image from 'next/image'
import Link from 'next/link'

import styles from './page.module.css'

export default function User() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          환영합니다 to <a href="https://nextjs.org">Next.js 13!</a>
        </h1>
      </main>
    </div>
  )
}
