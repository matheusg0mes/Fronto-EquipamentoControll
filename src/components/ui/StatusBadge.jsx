export default function StatusBadge({ disponivel }) {
  return (
    <span className={`badge ${disponivel ? 'badge--ok' : 'badge--warn'}`}>
      <span className="badge__dot">●</span> {disponivel ? 'Disponível' : 'Emprestado'}
    </span>
  )
}
