import { toast } from 'react-hot-toast'

// eslint-disable-next-line no-undef
export async function fetchWithJWT(input: RequestInfo | URL, init?: RequestInit) {
  const jwt = sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt')

  if (jwt) {
    if (!init) init = { headers: { Authorization: jwt } }
    else if (!init.headers) init.headers = { Authorization: jwt }
    else (init.headers as Record<string, string>).Authorization = jwt
  }

  const response = await fetch(input, init)
  return await response.json()
}

export async function fetchCatchingError(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, init)
  const result = await response.json()
  if (!response.ok) throw new Error(result.message)
  return result
}

export function toastError(error: Error) {
  toast.error(error.message)
}
