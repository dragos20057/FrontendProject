export interface ApiError {
  message: string
  status?: number
}

export const parseApiError = (error: unknown): ApiError => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const err = error as any

    return {
      message: err.response?.data?.message || 'Unexpected error',
      status: err.response?.status,
    }
  }

  return { message: 'Unknown error' }
}