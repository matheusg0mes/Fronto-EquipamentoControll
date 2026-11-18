import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Modal from '../components/ui/Modal'
import EmprestimosTable from '../components/EmprestimosTable'
import EmprestimoForm from '../components/forms/EmprestimoForm'
import { useEmprestimos } from '../hooks/useEmprestimos'
import { useEquipamentos } from '../hooks/useEquipamentos'
import { useColaboradores } from '../hooks/useColaboradores'
import { emprestimoService } from '../services/emprestimoService'

export default function Emprestimos() {
  const emp = useEmprestimos()
  const equip = useEquipamentos()
  const colab = useColaboradores()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(null)

  async function devolver(e) {
    setError(null)
    try {
      await emprestimoService.registrarDevolucao(e.id)
      emp.reload()
      equip.reload()
    } catch (err) {
      setError(err.userMessage)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Movimentações"
        title="Empréstimos"
        subtitle="Histórico e empréstimos em andamento."
        action={
          <button className="btn btn--primary btn--lg" onClick={() => setOpen(true)}>
            + Novo empréstimo
          </button>
        }
      />

      <div className="card">
        {(emp.error || error) && <p className="banner-error">{emp.error ?? error}</p>}
        <EmprestimosTable emprestimos={emp.data} onDevolver={devolver} />
      </div>

      <Modal open={open} title="Novo empréstimo" onClose={() => setOpen(false)}>
        <EmprestimoForm
          equipamentos={equip.data}
          colaboradores={colab.data}
          onCancel={() => setOpen(false)}
          onSaved={() => {
            setOpen(false)
            emp.reload()
            equip.reload()
          }}
        />
      </Modal>
    </>
  )
}
