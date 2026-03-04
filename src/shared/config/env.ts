const requiredEnv = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return value
}

export const env = {
  apiUrl: requiredEnv(
    import.meta.env.VITE_API_URL,
    'VITE_API_URL',
  ),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
}