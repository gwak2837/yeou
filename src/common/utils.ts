import { toast } from 'react-hot-toast'

import { NEXT_PUBLIC_BACKEND_URL } from './constants'

type Fetch = Parameters<typeof fetch>

// eslint-disable-next-line no-undef
export async function fetchWithJWT(input: Fetch[0], init?: Fetch[1]) {
  const jwt = sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt')

  if (jwt) {
    const Authorization = `Bearer ${jwt}`
    if (!init) init = { headers: { Authorization } }
    else if (!init.headers) init.headers = { Authorization }
    else (init.headers as Record<string, string>).Authorization = Authorization
  }

  return fetchThrowingError(input, init)
}

// eslint-disable-next-line no-undef
export async function fetchThrowingError(input: Fetch[0], init?: Fetch[1]) {
  const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}${input}`, init)
  const result = await response.json()
  if (!response.ok) throw new Error(result.message)
  return result
}

export function toastError(error: Error) {
  toast.error(error.message)
}

export const formatKRPrice = new Intl.NumberFormat('ko-KR').format
