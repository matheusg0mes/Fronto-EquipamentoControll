import { labelTipo } from '../constants/tipoEquipamento'
import StatusBadge from './ui/StatusBadge'

export default function EquipamentosTable({ equipamentos, onEmprestar }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Patrimônio</th>
          <th>Equipamento</th>
          <th>Tipo</th>
          <th>Status</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {equipamentos.map((e) => (
          <tr key={e.id}>
            <td className="table__strong">{e.patrimonio}</td>
            <td>{e.nome}</td>
            <td>{labelTipo(e.tipo)}</td>
            <td>
              <StatusBadge disponivel={e.disponivel} />
            </td>
            <td>
              {e.disponivel ? (
                <button className="link-btn" onClick={() => onEmprestar(e)}>
                  Emprestar
                </button>
              ) : (
                <span className="link-muted">Detalhes</span>
              )}
            </td>
          </tr>
        ))}
        {equipamentos.length === 0 && (
          <tr>
            <td colSpan={5} className="empty">
              Nenhum equipamento encontrado.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
