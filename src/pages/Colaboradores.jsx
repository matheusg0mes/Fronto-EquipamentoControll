import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Modal from '../components/ui/Modal'
import ColaboradorForm from '../components/forms/ColaboradorForm'
import { useColaboradores } from '../hooks/useColaboradores'

export default function Colaboradores() {
  const { data, error, reload } = useColaboradores()
  const [open, setOpen] = useState(false)

  return (
    <>
      <PageHeader
        eyebrow="Pessoas"
        title="Colaboradores"
        subtitle="Quem pode receber equipamentos."
        action={
          <button className="btn btn--primary btn--lg" onClick={() => setOpen(true)}>
            + Cadastrar
          </button>
        }
      />

      <div className="card">
        {error && <p className="banner-error">{error}</p>}
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>CPF</th>
              <th>Cidade</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c) => (
              <tr key={c.id}>
                <td className="table__strong">{c.nome}</td>
                <td>{c.email}</td>
                <td>{c.cpf}</td>
                <td>{c.endereco ? `${c.endereco.localidade ?? ''}${c.endereco.uf ? ` / ${c.endereco.uf}` : ''}` : '—'}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="empty">
                  Nenhum colaborador cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={open} title="Cadastrar colaborador" onClose={() => setOpen(false)}>
        <ColaboradorForm
          onCancel={() => setOpen(false)}
          onSaved={() => {
            setOpen(false)
            reload()
          }}
        />
      </Modal>
    </>
  )
}
