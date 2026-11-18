import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Anexa o JWT em toda requisição
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Normaliza mensagens de erro vindas do Spring (validações, ResponseStatusException etc.)
http.interceptors.response.use(
  (res) => res,
  (error) => {
    const data = error.response?.data
    const status = error.response?.status
    const isLogin = error.config?.url?.endsWith('/login')
    let message = 'Não foi possível concluir a operação.'

    // Token expirado/inválido: limpa e manda para o login
    if (status === 401 && !isLogin) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    if (isLogin && (status === 401 || status === 403)) message = 'E-mail ou senha inválidos.'
    else if (typeof data === 'string' && data) message = data
    else if (data?.message) message = data.message
    else if (data?.error) message = data.error
    else if (error.code === 'ERR_NETWORK') message = 'Sem conexão com a API.'

    error.userMessage = message
    return Promise.reject(error)
  },
)
