import { Link } from 'react-router-dom'
import { diasDeAtraso, formatarData, textoDias } from '../utils/emprestimo'
import { AlertIcon } from './ui/Icons'

export default function OverduePanel({ atrasados, limit = 3 }) {
  return (
    <section className="card overdue">
      <div className="card__head">
        <div>
          <h2>Empréstimos atrasados</h2>
          <p>Itens que precisam de atenção</p>
        </div>
        <span className="count-pill">{atrasados.length}</span>
      </div>

      <ul className="overdue__list">
        {atrasados.slice(0, limit).map((e) => (
          <li key={e.id} className="overdue__item">
            <div className="overdue__icon">
              <AlertIcon width={16} height={16} />
            </div>
            <div className="overdue__info">
              <strong>
                {e.equipamento?.patrimonio} · {e.equipamento?.nome}
              </strong>
              <span>{e.colaborador?.nome}</span>
              <small>Previsto: {formatarData(e.dataPrevistaDevolucao)}</small>
            </div>
            <span className="days-pill">{textoDias(diasDeAtraso(e))}</span>
          </li>
        ))}
        {atrasados.length === 0 && <li className="empty">Nenhum empréstimo atrasado 🎉</li>}
      </ul>

      <Link to="/atrasados" className="overdue__cta">
        Ver todos os atrasados
      </Link>
    </section>
  )
}
