'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { localStorage, sessionStorage } from '../../common/constants'
import LoginLink from '../../components/LoginLink'

export default function OAuth() {
  const searchParams = useSearchParams()

  const jwt = searchParams.get('jwt')
  const isExpired = searchParams.get('isExpired')
  const error = searchParams.get('error')

  const router = useRouter()
  const queryClient = useQueryClient()

  // OAuth callback 처리
  useEffect(() => {
    if (error) {
      toast.error(error)
      return
    }

    if (isExpired) {
      toast(
        <div>
          로그인이 만료됐어요. 다시 <LoginLink />
        </div>
      )
      return
    }

    if (!jwt) return

    if (sessionStorage?.getItem('autoLogin')) {
      localStorage?.setItem('jwt', jwt)
    } else {
      sessionStorage?.setItem('jwt', jwt)
    }

    queryClient.refetchQueries({ queryKey: ['user'] })
    router.replace(sessionStorage?.getItem('redirectToAfterLogin') ?? '/')
    toast.success('소셜 로그인 성공')
  }, [error, isExpired, jwt, queryClient, router])

  useEffect(() => {
    return () => {
      sessionStorage?.removeItem('autoLogin')
      sessionStorage?.removeItem('redirectToAfterLogin')
    }
  }, [])

  return (
    <main className="">
      <div className="">{error ? formatError(error) : '소셜 로그인 중...'}</div>
    </main>
  )
}

function formatError(error: string) {
  switch (error) {
    case '':
      return ''
    default:
      return '확인되지 않은 오류입니다'
  }
}
