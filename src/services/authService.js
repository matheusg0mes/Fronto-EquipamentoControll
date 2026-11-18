import { http } from '../api/http'

const TOKEN_KEY = 'token'

export const authService = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
  logout: () => localStorage.removeItem(TOKEN_KEY),

  // POST /auth/login { email, senha } -> token (string)
  login: async (email, senha) => {
    const { data } = await http.post('/auth/login', { email, senha })
    // aceita tanto "eyJ..." (string pura) quanto { token: "eyJ..." }
    const token = typeof data === 'string' ? data : data?.token
    if (!token) throw Object.assign(new Error('Resposta sem token'), { userMessage: 'Resposta inválida do servidor.' })
    localStorage.setItem(TOKEN_KEY, token)
    return token
  },
}
