import { http } from '../api/http'

const BASE = '/emprestimo'

export const emprestimoService = {
  listar: () => http.get(BASE + 's').then((r) => r.data),

  criar: ({ equipamentoId, colaboradorId, dataEmprestimo, dataPrevistaDevolucao }) =>
    http
      .post(BASE, {
        equipamentoId,
        colaboradorId,
        dataEmprestimo,
        dataPrevistaDevolucao,
      })
      .then((r) => r.data),

  registrarDevolucao: (id) => http.put(`${BASE}/${id}/devolucao`).then((r) => r.data),
}