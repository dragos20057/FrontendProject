import { useEffect } from 'react'
import { useAuthStore } from './auth.store'
import { meRequest } from '../api/auth.api'
import { tokenService } from '@/shared/lib/token'

export const useAuthBootstrap = () => {
  const setUser = useAuthStore((state) => state.setUser)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    const token = tokenService.get()

    if (!token) return

    const initAuth = async () => {
      try {
        const user = await meRequest()
        setUser(user)
      } catch {
        logout()
      }
    }

    initAuth()
  }, [])
}