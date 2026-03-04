export interface ServerError {
  status: number
  message: string
  errors?: Record<string, string[]>
}