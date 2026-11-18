import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import EmprestimosTable from '../components/EmprestimosTable'
import { useEmprestimos } from '../hooks/useEmprestimos'
import { emprestimoService } from '../services/emprestimoService'

export default function Atrasados() {
  const emp = useEmprestimos()
  const [error, setError] = useState(null)

  async function devolver(e) {
    setError(null)
    try {
      await emprestimoService.registrarDevolucao(e.id)
      emp.reload()
    } catch (err) {
      setError(err.userMessage)
    }
  }

  return (
    <>
      <PageHeader eyebrow="Atenção" title="Atrasados" subtitle="Empréstimos com devolução vencida." />
      <div className="card">
        {(emp.error || error) && <p className="banner-error">{emp.error ?? error}</p>}
        <EmprestimosTable emprestimos={emp.atrasados} onDevolver={devolver} />
      </div>
    </>
  )
}
