import { useMutation } from '@tanstack/react-query'
import { loginRequest } from '../api/auth.api'
import { tokenService } from '@/shared/lib/token'
import { useAuthStore } from './auth.store'
import { LoginRequest } from '@/entities/user/model/types'

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: (data: LoginRequest) => loginRequest(data),

    onSuccess: (data) => {
      tokenService.set(data.accessToken)
      setUser(data.user)
    },
  })
}