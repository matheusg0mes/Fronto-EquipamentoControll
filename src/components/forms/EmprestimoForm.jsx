import { useState } from 'react'
import Field from '../ui/Field'
import { emprestimoService } from '../../services/emprestimoService'
import { hojeISO } from '../../utils/emprestimo'

function somarDias(iso, dias) {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(y, m - 1, d + dias)
  const pad = (n) => String(n).padStart(2, '0')
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`
}

export default function EmprestimoForm({ equipamentos, colaboradores, equipamentoId, onSaved, onCancel }) {
  const disponiveis = equipamentos.filter((e) => e.disponivel)
  const [form, setForm] = useState({
    equipamentoId: equipamentoId ?? '',
    colaboradorId: '',
    dataEmprestimo: hojeISO(),
    dataPrevistaDevolucao: somarDias(hojeISO(), 7),
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const payload = {
        equipamentoId: Number(form.equipamentoId),
        colaboradorId: Number(form.colaboradorId),
        dataEmprestimo: form.dataEmprestimo,
        dataPrevistaDevolucao: form.dataPrevistaDevolucao,
      }

      // TEMPORÁRIO: remova depois de achar o problema
      console.log('payload:', payload, JSON.stringify(payload))

      await emprestimoService.criar(payload)
      onSaved()
    } catch (err) {
      setError(err.userMessage)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <Field label="Equipamento">
        <select required value={form.equipamentoId} onChange={set('equipamentoId')}>
          <option value="">Selecione…</option>
          {disponiveis.map((e) => (
            <option key={e.id} value={e.id}>
              {e.patrimonio} · {e.nome}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Colaborador">
        <select required value={form.colaboradorId} onChange={set('colaboradorId')}>
          <option value="">Selecione…</option>
          {colaboradores.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
      </Field>
      <div className="form__row">
        <Field label="Data do empréstimo">
          <input required type="date" value={form.dataEmprestimo} onChange={set('dataEmprestimo')} />
        </Field>
        <Field label="Previsão de devolução">
          <input
            required
            type="date"
            min={form.dataEmprestimo}
            value={form.dataPrevistaDevolucao}
            onChange={set('dataPrevistaDevolucao')}
          />
        </Field>
      </div>
      {error && <p className="form__error">{error}</p>}
      <div className="form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          Cancelar
        </button>
        <button className="btn btn--primary" disabled={saving}>
          {saving ? 'Salvando…' : 'Emprestar'}
        </button>
      </div>
    </form>
  )
}