export async function getUserFromCookie() {
    try {
      const res = await fetch('http://localhost:3001/auth/me', {
        credentials: 'include',
      })
      if (!res.ok) return null
      const user = await res.json()
      return user
    } catch {
      return null
    }
  }
  
  export async function logout() {
    await fetch('http://localhost:3001/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  }
  