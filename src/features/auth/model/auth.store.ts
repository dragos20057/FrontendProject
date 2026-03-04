import { create } from 'zustand'
import type { User } from '@/entities/user/model/types'
import { tokenService } from '@/shared/lib/token'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!tokenService.get(),

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  logout: () => {
    tokenService.remove()
    set({
      user: null,
      isAuthenticated: false,
    })
  },
}))