export default function StatCard({ icon, tone = 'blue', label, value, caption }) {
  return (
    <div className="stat-card">
      <div className={`stat-card__icon tone-${tone}`}>{icon}</div>
      <div>
        <p className="stat-card__label">{label}</p>
        <p className="stat-card__value">{value}</p>
        <p className="stat-card__caption">{caption}</p>
      </div>
    </div>
  )
}
