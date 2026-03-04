import axios from 'axios'
import { tokenService } from '@/shared/lib/token'
import { refreshRequest } from '@/features/auth/api/refresh.api'
import { useAuthStore } from '@/features/auth/model/auth.store'
import { env } from '@/shared/config/env'
export const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = tokenService.get()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const data = await refreshRequest()

        tokenService.set(data.accessToken)

        processQueue(null, data.accessToken)

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)

        tokenService.remove()
        useAuthStore.getState().logout()

        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)