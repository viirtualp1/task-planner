import { create } from 'zustand'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  setUser: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = Boolean(token)

  return {
    token,
    isAuthenticated,
    setUser: (token: string) => {
      localStorage.setItem('token', token)
      set({ token, isAuthenticated: true })
    },
    logout: () => {
      localStorage.removeItem('token')
      set({ token: null, isAuthenticated: false })
    },
  }
})
