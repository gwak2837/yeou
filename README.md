# 쿠팡 가격 알리미

## 💻 개발 환경

- macOS 12.6
- [Node.js](https://nodejs.org/en/) 18.12
- [Yarn](https://yarnpkg.com/getting-started/install#install-corepack) 3.3
- [Git](https://git-scm.com/download) 2.38

## ☁ Cloud

- [Vercel](https://vercel.com)
- [Google Cloud Run](https://cloud.google.com/run)
- [Google Cloud Storage](https://cloud.google.com/storage)
- [Google Cloud Build](https://cloud.google.com/build)
- [Google Container Registry](https://cloud.google.com/container-registry)
- [Oracle Virtual Machine](https://www.oracle.com/kr/cloud/compute/virtual-machines/)

## 📦 과정

### Yarn berry

> https://yarnpkg.com/getting-started/install

Node.js v16.10 이상부터 같이 오는 Corepack을 활성화합니다.

```bash
corepack enable
corepack prepare yarn@stable --activate
```

### Next.js

> https://nextjs.org/docs/api-reference/create-next-app \
> https://nextjs.org/docs/advanced-features/src-directory \
> https://nextjs.org/docs/advanced-features/output-file-tracing

Next.js 프로젝트를 생성합니다.

```bash
yarn create next-app 프로젝트이름 --ts --eslint --experimental-app
yarn add sharp
```

`next.config.js` 파일을 수정합니다:

```js
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['storage.googleapis.com'],
  },
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
}
```

루트 디렉토리에 `src` 폴더를 생성한 후 `app`, `pages` 폴더를 `src` 폴더 아래에 넣어줍니다.

그리고 `LICENSE` 파일과 `CODE_OF_CONDUCT.md` 파일을 생성하고 적절히 작성합니다.

### Git

> https://www.toptal.com/developers/gitignore

`.gitignore` 파일을 생성하고 적절히 수정합니다.

`.gitattributes` 파일을 아래와 같이 생성합니다:

```
# Auto detect text files and perform LF normalization
* text eol=lf

# These files are binary and should be left untouched
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.webp binary
*.pdf binary

*.otf binary
*.ttf binary
*.woff binary
*.woff2 binary

그외 바이너리로 취급할 파일 목록
```

### Prettier

> https://prettier.io/docs/en/install.html

Prettier를 설치합니다.

```bash
yarn add --dev --exact prettier
echo {}> .prettierrc.json
```

`.prettierrc.json` 파일을 수정합니다:

```json
{
  "printWidth": 100,
  "semi": false,
  "singleQuote": true
}
```

`.prettierignore` 파일을 아래와 같이 생성합니다:

```
.yarn
.pnp.*
```

### Husky

> https://typicode.github.io/husky/#/?id=automatic-recommended \
> https://typicode.github.io/husky/#/?id=yarn-on-windows

Husky를 설치합니다.

```bash
yarn dlx husky-init --yarn2 && yarn
```

`.husky/common.sh` 파일을 생성합니다:

```sh
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Workaround for Windows 10, Git Bash and Yarn
if command*exists winpty && test -t 1; then
  exec < /dev/tty
fi
```

`.husky/pre-push` 파일을 수정합니다:

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/*/husky.sh"
. "$(dirname -- "$0")/common.sh"

yarn tsc
```

### Jest + Next.js

> https://nextjs.org/docs/testing#jest-and-react-testing-library

Jest와 @testing-library/react를 설치합니다.

```bash
yarn add --dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

`jest.config.js` 파일을 프로젝트 루트 디렉토리에 생성하고 아래 내용을 붙여 넣습니다:

```js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

### Yarn berry + (ESLint, Prettier, TypeScript, VSCode, Next.js)

> https://yarnpkg.com/getting-started/editor-sdks \
> https://yarnpkg.com/cli/upgrade-interactive

```bash
yarn set version stable
yarn dlx @yarnpkg/sdks vscode
yarn plugin import interactive-tools
yarn unplug next
```

`package.json` 파일 내용을 복원합니다.

### VSCode

`.vscode/settings.json` 파일을 수정합니다:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.insertSpaces": true,
  "editor.tabSize": 2,
  "files.autoSave": "onFocusChange",
  "files.eol": "\n",
  "sort-imports.default-sort-style": "module",

  ...
}
```

`.vscode/recommendations.json` 파일을 수정합니다:

```json
{
  "recommendations": [
    "visualstudioexptteam.vscodeintellicode",
    "christian-kohler.npm-intellisense",
    "christian-kohler.path-intellisense",
    "tabnine.tabnine-vscode",
    "bradlc.vscode-tailwindcss",
    "csstools.postcss",
    "amatiasq.sort-imports",

    ...
  ]
}
```

### ESLint + (Prettier, Jest)

> https://nextjs.org/docs/basic-features/eslint#additional-configurations \
> https://github.com/jest-community/eslint-plugin-jest#readme

ESLint 설정 패키지를 설치합니다.

```bash
yarn add --dev eslint-config-prettier eslint-plugin-jest
```

`.eslintrc.json` 파일을 수정합니다:

```json
{
  "env": {
    "browser": true,
    "es2022": true,
    "jest/globals": true,
    "node": true,
    "worker": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "next/core-web-vitals",
    "prettier"
  ]
  ...
}
```

### Sanitize CSS

```bash
yarn add sanitize.css
```

`src/app/globals.css` 파일에 아래 코드를 가장 위에 추가합니다:

```css
@import '~sanitize.css';
@import '~sanitize.css/forms.css';
@import '~sanitize.css/typography.css';

...
```

### Tailwind CSS

> https://tailwindcss.com/docs/guides/nextjs \
> https://tailwindcss.com/docs/optimizing-for-production \
> https://cssnano.co/docs/what-are-optimisations/

Tailwind CSS를 설치합니다.

```bash
yarn add --dev tailwindcss postcss autoprefixer cssnano cssnano-preset-advanced
yarn tailwindcss init -p
```

`tailwind.config.js` 파일을 수정합니다:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

`postcss.config.js` 파일을 아래와 같이 수정합니다:

```js
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: { preset: 'advanced' } } : {}),
  },
}
```

`src/app/globals.css` 파일에 아래 코드를 추가합니다:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### PWA

> https://github.com/shadowwalker/next-pwa#readme \
> https://github.com/shadowwalker/next-pwa/tree/master/examples/custom-ts-worker \
> https://realfavicongenerator.net/

Next PWA를 설치합니다.

```
yarn add next-pwa
yarn add --dev babel-loader
```

`next.config.js` 파일을 수정합니다:

```js
const withPWA = require('next-pwa')({
  customWorkerDir: 'src/worker',
  dest: 'public',
})

...

module.exports = withPWA(nextConfig)
```

`tsconfig.json` 파일을 수정합니다:

```json
{
  "compilerOptions": {
    "lib": [..., "webworker"],
    ...
  },
  ...
}
```

`.gitignore` 파일을 수정합니다:

```gitignore
...

public/*.js
public/*.map
```

`.yarnrc.yml` 파일을 수정합니다:

```yml
packageExtensions:
  babel-loader@*:
    dependencies:
      '@babel/core': '*'
```

`yarn` 명령어를 실행해 `.yarnrc.yml` 변경 사항을 반영해줍니다.

realfavicongenerator.net 사이트에 접속해서 PWA 관련 여러 파일을 생성합니다.

`src/app/head.tsx` 파일을 아래와 같이 수정합니다:

```tsx
...

export default function Head() {
  return (
    <>
      ...

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#색상" />
      <meta name="msapplication-TileColor" content="#색상" />
      <meta name="theme-color" content="#색상" />

      <link rel="shortcut icon" href="/images/shortcut-icon.png" />
      <link rel="canonical" href={CANONICAL_URL} />
      <meta name="author" content={AUTHOR} />
      <meta name="keywords" content={KEYWORDS} />
      <meta name="application-name" content={APPLICATION_SHORT_NAME} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content={APPLICATION_SHORT_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="subject" content={SUBJECT} />
      <meta name="rating" content="general" />
      <meta name="robots" content="index,follow" />
      <meta name="revisit-after" content="3 days" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    </>
  )
}
```

`src/worker/index.ts` 파일을 아래와 같이 생성합니다:

```ts
/// <reference lib="webworker" />

// eslint-disable-next-line no-undef
export declare const self: ServiceWorkerGlobalScope

self.addEventListener('install', (e) => {
  console.log('👀 - install', e)
  e.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (e) => {
  console.log('👀 - activate', e)
})

self.addEventListener('push', (e) => {
  const message = e.data?.json()
  console.log('👀 - message', message)

  e.waitUntil(
    self.registration.showNotification(message.sender.nickname, {
      body: message.content,
      icon: message.sender.imageUrl,
      data: message.url,
    })
  )
})

self.addEventListener('notificationclick', (e) => {
  self.clients.openWindow(e.notification.data)
})

// listen to message event from window
self.addEventListener('message', (e) => {
  // HOW TO TEST THIS?
  // Run this in your browser console:
  //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
  // OR use next-pwa injected workbox object
  //     window.workbox.messageSW({command: 'log', message: 'hello world'})
  console.log(e.data)
})
```

### Environment variables

```env

```

### Channel.IO

> https://developers.channel.io/docs/web-installation \
> https://www.toptal.com/developers/javascript-minifier

`src/components/ChannelTalk.tsx` 파일을 아래와 같이 생성합니다:

```tsx
'use client'

import Script from 'next/script'

import { NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY } from '../common/constants'

const channelTalkScript = `!function(){var e=window;if(e.ChannelIO)return(window.console.error||window.console.log||function(){})("ChannelIO script included twice.");var n=function(){n.c(arguments)};function t(){if(!e.ChannelIOInitialized){e.ChannelIOInitialized=!0;var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://cdn.channel.io/plugin/ch-plugin-web.js",n.charset="UTF-8";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(n,t)}}n.q=[],n.c=function(e){n.q.push(e)},e.ChannelIO=n,"complete"===document.readyState?t():window.attachEvent?window.attachEvent("onload",t):(window.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1))}(),ChannelIO("boot",{pluginKey:"${NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY}"});`

export function bootChanneltalk(option: Record<string, any>) {
  window.ChannelIO('shutdown')
  window.ChannelIO('boot', option)
}

export default function ChannelTalk() {
  return <Script id="channel-talk">{channelTalkScript}</Script>
}
```

`src/app/layout.tsx` 파일을 아래와 같이 수정합니다:

```tsx
...

import ChannelTalk from '../components/ChannelTalk'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      ...
      <ChannelTalk />
    </html>
  )
}
```

### Google Analytics

> https://developers.google.com/tag-platform/gtagjs \
> https://github.com/vercel/next.js/tree/canary/examples/with-google-analytics \
> https://nextjs.org/docs/messages/next-script-for-ga

`src/components/GoogleAnalytics.tsx` 파일을 아래와 같이 생성합니다:

```tsx
'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'
import { NEXT_PUBLIC_GA_ID } from '../common/constants'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export function pageview(url: string) {
  window.gtag('config', NEXT_PUBLIC_GA_ID, {
    page_path: url,
  })
}

type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export function event({ action, category, label, value }: GTagEvent) {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

const gaScript = `function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","${NEXT_PUBLIC_GA_ID}");`

export default function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!window.gtag || !pathname) return

    pageview(pathname)
  }, [pathname])

  // Next.js 13 에서 아직 미지원
  // const router = useRouter()
  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     pageview(url)
  //   }
  //   router.events.on('routeChangeComplete', handleRouteChange)
  //   router.events.on('hashChangeComplete', handleRouteChange)
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //     router.events.off('hashChangeComplete', handleRouteChange)
  //   }
  // }, [router.events])

  return (
    // https://nextjs.org/docs/messages/next-script-for-ga
    NEXT_PUBLIC_GA_ID ? (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {gaScript}
        </Script>
      </>
    ) : null
  )
}
```

`src/app/layout.tsx` 파일을 아래와 같이 수정합니다:

```tsx
...

import GoogleAnalytics from '../components/GoogleAnalytics'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      ...
      <GoogleAnalytics />
    </html>
  )
}
```

### FlareLane

> https://docs.flarelane.com/web-push-direct

`src/components/FlareLane.tsx` 파일을 아래와 같이 생성합니다:

```
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
```

### Font

> https://github.com/orioncactus/pretendard \
> https://nextjs.org/docs/api-reference/next/font

You can optimally load web fonts with zero layout shift, thanks to the underlying CSS `size-adjust` property used.

```
yarn add @next/font
```

`src/app/layout.tsx` 파일을 아래와 같이 수정합니다. src엔 폰트 파일 경로를 입력합니다.

가능한 확장자: `woff2`, `woff`, `ttf`, `otf`

```tsx
...
import localFont from '@next/font/local'

const myFont = localFont({
  src: './PretendardVariable.woff2',
  fallback: [
    'Pretendard',
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko-KR" className={myFont.className}>
      <head />
      ...
      <body className={myFont.className}>{children}</body>
    </html>
  )
}
```

### Recoil, React Query, React Toast, React Form

> https://tanstack.com/query/v4/docs/overview \
> https://recoiljs.org/docs/introduction/getting-started \
> https://react-hot-toast.com/docs \
> https://react-hook-form.com/get-started \
> https://beta.nextjs.org/docs/rendering/server-and-client-components#third-party-packages

```bash
yarn add @tanstack/react-query recoil react-hot-toast react-hook-form
```

`src/components/ReactQuery.tsx` 파일을 아래와 같이 생성합니다:

```tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const queryClient = new QueryClient()

export default function ReactQuery({ children }: Props) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
```

`src/components/Recoil.tsx` 파일을 아래와 같이 생성합니다:

```tsx
'use client'

import { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

type Props = {
  children: ReactNode
}

export default function Recoil({ children }: Props) {
  return <RecoilRoot>{children}</RecoilRoot>
}
```

`src/components/ReactHotToast.tsx` 파일을 아래와 같이 생성합니다:

```tsx
'use client'

import { Toaster } from 'react-hot-toast'

export default function ReactHotToast() {
  return <Toaster />
}
```

`src/app/layout.tsx` 파일을 아래와 같이 수정합니다:

```tsx
...
import ReactQuery from '../components/ReactQuery'
import Recoil from '../components/Recoil'
import ReactHotToast from '../components/ReactHotToast'
...
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko-KR" className={myFont.className}>
      ...
      <body className={myFont.className}>
        <Recoil>
          <ReactQuery>{children}</ReactQuery>
        </Recoil>
        <ReactHotToast />
      </body>
    </html>
  )
}
```

### Next.js API

> https://beta.nextjs.org/docs/data-fetching/revalidating#on-demand-revalidation

`src/pages/api/revalidate.ts` 파일을 아래와 같이 생성합니다:

```ts
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

  if (req.query.key !== REVALIDATION_KEY)
    return res.status(401).json({ error: 'Invalid revalidation key' })

  if (!url || typeof url !== 'string') return res.status(400).json({ error: 'Invalid url' })

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
```

oauth
스플래시 이미지
구글 애드센스
i18n
