import { http } from '../api/http'

// Ajuste os caminhos conforme seus @RequestMapping do Spring.
const BASE = '/equipamento'

export const equipamentoService = {
  listar: () => http.get(`${BASE}`+"/buscar").then((r) => r.data),
  buscar: (id) => http.get(`${BASE}/buscar/${id}`).then((r) => r.data),
  criar: (dto) => http.post(`${BASE}/criar`, dto).then((r) => r.data),
  atualizar: (id, dto) => http.put(`${BASE}/atualizar/${id}`, dto).then((r) => r.data),
  remover: (id) => http.delete(`${BASE}/delete${id}`),
}
