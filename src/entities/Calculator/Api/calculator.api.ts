import { api } from '@/api/client'
import {
  CalculateRequest,
  CalculateResponse,
} from '../model/types'

export const calculatePrice = async (
  data: CalculateRequest,
): Promise<CalculateResponse> => {
  const response = await api.post('/calculator', data)
  return response.data
}