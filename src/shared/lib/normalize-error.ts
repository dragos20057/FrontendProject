import type { AxiosError } from 'axios'
import type { ServerError } from '../types/server-error'

export const normalizeError = (
  error: unknown,
): ServerError => {
  if ((error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError<any>

    return {
      status: axiosError.response?.status || 500,
      message:
        axiosError.response?.data?.title ||
        axiosError.response?.data?.message ||
        'Unexpected server error',
      errors: axiosError.response?.data?.errors,
    }
  }

  return {
    status: 500,
    message: 'Unknown error',
  }
}