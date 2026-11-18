import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Field from '../components/ui/Field'
import { BoxIcon } from '../components/ui/Icons'
import { authService } from '../services/authService'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (authService.isAuthenticated()) return <Navigate to="/" replace />

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await authService.login(email, senha)
      navigate(location.state?.from?.pathname ?? '/', { replace: true })
    } catch (err) {
      setError(err.userMessage ?? err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login">
      <form className="login__card form" onSubmit={submit}>
        <div className="login__brand">
          <div className="sidebar__logo">
            <BoxIcon />
          </div>
          <div>
            <strong>EquipControl</strong>
            <span>Gestão de empréstimos</span>
          </div>
        </div>

        <Field label="E-mail">
          <input
            required
            type="email"
            autoComplete="username"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Senha">
          <input
            required
            type="password"
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </Field>

        {error && <p className="form__error">{error}</p>}

        <button type="submit" className="btn btn--primary btn--lg" disabled={loading}>
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
