import { useState } from 'react'
import Field from '../ui/Field'
import { colaboradorService } from '../../services/colaboradorService'

const vazio = { nome: '', email: '', cpf: '', cep: '', numero: '' }

// 12345678 -> 12345-678
const mascaraCep = (v) =>
  v.replace(/\D/g, '').slice(0, 8).replace(/^(\d{5})(\d)/, '$1-$2')

export default function ColaboradorForm({ onSaved, onCancel }) {
  const [form, setForm] = useState(vazio)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const setCep = (e) => setForm((f) => ({ ...f, cep: mascaraCep(e.target.value) }))

  async function submit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await colaboradorService.criar({
        nome: form.nome,
        email: form.email,
        cpf: form.cpf,
        cep: form.cep.replace(/\D/g, ''), // só dígitos
        numero: form.numero,
      })
      onSaved()
    } catch (err) {
      setError(err.userMessage)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <Field label="Nome">
        <input required minLength={3} maxLength={50} value={form.nome} onChange={set('nome')} />
      </Field>
      <div className="form__row">
        <Field label="E-mail">
          <input required type="email" value={form.email} onChange={set('email')} />
        </Field>
        <Field label="CPF">
          <input required value={form.cpf} onChange={set('cpf')} placeholder="000.000.000-00" />
        </Field>
      </div>
      <div className="form__row">
        <Field label="CEP">
          <input required value={form.cep} onChange={setCep} placeholder="00000-000" inputMode="numeric" />
        </Field>
        <Field label="Número">
          <input required value={form.numero} onChange={set('numero')} />
        </Field>
      </div>

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