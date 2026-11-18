import { useState } from 'react'
import Field from '../ui/Field'
import { TIPOS_EQUIPAMENTO } from '../../constants/tipoEquipamento'
import { equipamentoService } from '../../services/equipamentoService'

export default function EquipamentoForm({ onSaved, onCancel }) {
  const [form, setForm] = useState({ patrimonio: '', nome: '', tipo: 'NOTEBOOK' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await equipamentoService.criar({ ...form, disponivel: true })
      onSaved()
    } catch (err) {
      setError(err.userMessage)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <Field label="Patrimônio">
        <input required value={form.patrimonio} onChange={set('patrimonio')} placeholder="NB-0001" />
      </Field>
      <Field label="Nome">
        <input required value={form.nome} onChange={set('nome')} placeholder="Notebook Dell Latitude 5440" />
      </Field>
      <Field label="Tipo">
        <select value={form.tipo} onChange={set('tipo')}>
          {TIPOS_EQUIPAMENTO.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>
      {error && <p className="form__error">{error}</p>}
      <div className="form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          Cancelar
        </button>
        <button className="btn btn--primary" disabled={saving}>
          {saving ? 'Salvando…' : 'Cadastrar'}
        </button>
      </div>
    </form>
  )
}
