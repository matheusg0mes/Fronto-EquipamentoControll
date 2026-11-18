import { diasDeAtraso, estaAberto, formatarData, textoDias } from '../utils/emprestimo'

export default function EmprestimosTable({ emprestimos, onDevolver }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Equipamento</th>
          <th>Colaborador</th>
          <th>Empréstimo</th>
          <th>Previsão</th>
          <th>Situação</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {emprestimos.map((e) => {
          const atraso = diasDeAtraso(e)
          return (
            <tr key={e.id}>
              <td>
                <span className="table__strong">{e.equipamento?.patrimonio}</span> · {e.equipamento?.nome}
              </td>
              <td>{e.colaborador?.nome}</td>
              <td>{formatarData(e.dataEmprestimo)}</td>
              <td>{formatarData(e.dataPrevistaDevolucao)}</td>
              <td>
                {!estaAberto(e) ? (
                  <span className="badge badge--ok">Devolvido em {formatarData(e.dataDevolucao)}</span>
                ) : atraso > 0 ? (
                  <span className="badge badge--danger">Atrasado · {textoDias(atraso)}</span>
                ) : (
                  <span className="badge badge--warn">Em andamento</span>
                )}
              </td>
              <td>
                {estaAberto(e) ? (
                  <button className="link-btn" onClick={() => onDevolver(e)}>
                    Registrar devolução
                  </button>
                ) : (
                  <span className="link-muted">—</span>
                )}
              </td>
            </tr>
          )
        })}
        {emprestimos.length === 0 && (
          <tr>
            <td colSpan={6} className="empty">
              Nenhum empréstimo encontrado.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
