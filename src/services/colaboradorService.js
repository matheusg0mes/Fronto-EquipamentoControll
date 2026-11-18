import { http } from '../api/http'

const BASE = '/colaborador'

export const colaboradorService = {
  listar: () => http.get(`${BASE}`+"es"+"/buscar").then((r) => r.data),
  buscar: (id) => http.get(`${BASE}/buscar/${id}`).then((r) => r.data),
  criar: (dto) => http.post(`${BASE}/criar`, dto).then((r) => r.data),
  atualizar: (id, dto) => http.put(`${BASE}/${id}`, dto).then((r) => r.data),
  remover: (id) => http.delete(`${BASE}/${id}`),
}
