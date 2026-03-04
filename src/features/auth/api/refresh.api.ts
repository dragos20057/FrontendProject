import { api } from '@/api/client'
import type { AuthResponse } from '@/entities/user/model/types'

export const refreshRequest = async (): Promise<AuthResponse> => {
  const response = await api.post('/auth/refresh')
  return response.data
}