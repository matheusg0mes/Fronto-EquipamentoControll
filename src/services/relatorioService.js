import axios from 'axios'

// FastAPI (Python) que gera o relatório Excel
const reportHttp = axios.create({
  baseURL: import.meta.env.VITE_REPORT_URL ?? 'https://relatorio-equipamentocontroller.onrender.com',
  responseType: 'blob', // o .xlsx é binário: sem isso o arquivo corrompe
})

// Anexa o JWT também no serviço de relatórios
reportHttp.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Quando dá erro, o corpo também vem como blob; converte para texto legível
async function mensagemDeErro(error) {
  const blob = error.response?.data
  if (blob instanceof Blob) {
    try {
      const json = JSON.parse(await blob.text())
      if (json.detail) return String(json.detail)
    } catch {
      /* corpo não era JSON */
    }
  }
  if (error.code === 'ERR_NETWORK') return 'Serviço de relatórios fora do ar.'
  return 'Não foi possível gerar o relatório.'
}

export const relatorioService = {
  baixarEmprestimos: async () => {
    try {
      const res = await reportHttp.get('/relatorio')
      const url = URL.createObjectURL(res.data)
      const a = document.createElement('a')
      a.href = url
      a.download = 'relatorio_emprestimos.xlsx'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (error) {
      error.userMessage = await mensagemDeErro(error)
      throw error
    }
  },
}
