import { api } from '@/api/client'

export const http = {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
}