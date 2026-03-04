let accessToken: string | null = localStorage.getItem('access_token')

export const tokenService = {
  get: () => accessToken,

  set: (token: string) => {
    accessToken = token
    localStorage.setItem('access_token', token)
  },

  remove: () => {
    accessToken = null
    localStorage.removeItem('access_token')
  },
}