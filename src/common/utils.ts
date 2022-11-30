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
