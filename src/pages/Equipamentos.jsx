import { useMemo, useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Modal from '../components/ui/Modal'
import EquipamentosTable from '../components/EquipamentosTable'
import EquipamentoForm from '../components/forms/EquipamentoForm'
import EmprestimoForm from '../components/forms/EmprestimoForm'
import { useEquipamentos } from '../hooks/useEquipamentos'
import { useColaboradores } from '../hooks/useColaboradores'
import { TIPOS_EQUIPAMENTO } from '../constants/tipoEquipamento'

export default function Equipamentos() {
  const equip = useEquipamentos()
  const colab = useColaboradores()
  const [busca, setBusca] = useState('')
  const [tipo, setTipo] = useState('')
  const [modal, setModal] = useState(null)
  const [selecionado, setSelecionado] = useState(null)

  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase()
    return equip.data.filter(
      (e) =>
        (!tipo || e.tipo === tipo) &&
        (!q || e.nome?.toLowerCase().includes(q) || e.patrimonio?.toLowerCase().includes(q)),
    )
  }, [equip.data, busca, tipo])

  const fechar = () => {
    setModal(null)
    setSelecionado(null)
  }

  return (
    <>
      <PageHeader
        eyebrow="Patrimônio"
        title="Equipamentos"
        subtitle="Todos os itens cadastrados."
        action={
          <button className="btn btn--primary btn--lg" onClick={() => setModal('novo')}>
            + Cadastrar
          </button>
        }
      />

      <div className="card">
        <div className="card__head">
          <div className="card__tools card__tools--left">
            <input
              className="input-sm"
              placeholder="Buscar por nome ou patrimônio…"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <select className="select-sm" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="">Todos os tipos</option>
              {TIPOS_EQUIPAMENTO.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {equip.error && <p className="banner-error">{equip.error}</p>}
        <EquipamentosTable
          equipamentos={lista}
          onEmprestar={(e) => {
            setSelecionado(e)
            setModal('emprestar')
          }}
        />
      </div>

      <Modal open={modal === 'novo'} title="Cadastrar equipamento" onClose={fechar}>
        <EquipamentoForm
          onCancel={fechar}
          onSaved={() => {
            fechar()
            equip.reload()
          }}
        />
      </Modal>
      <Modal open={modal === 'emprestar'} title="Novo empréstimo" onClose={fechar}>
        <EmprestimoForm
          equipamentos={equip.data}
          colaboradores={colab.data}
          equipamentoId={selecionado?.id}
          onCancel={fechar}
          onSaved={() => {
            fechar()
            equip.reload()
          }}
        />
      </Modal>
    </>
  )
}
