export function saveAuthData(token, user) {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export function getStoredToken() {
  return localStorage.getItem('token')
}

export function getStoredUser() {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export function clearAuthData() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export function decodeJwt(token) {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
  } catch {
    return null
  }
}

export function isTokenValid(user) {
  return user && user.exp && Date.now() < user.exp * 1000
}