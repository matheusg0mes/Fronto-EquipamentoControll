import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import StatCard from '../components/ui/StatCard'
import Modal from '../components/ui/Modal'
import { AlertIcon, ArrowRight, BoxIcon, CheckIcon, DownloadIcon, SwapIcon, UserIcon } from '../components/ui/Icons'
import EquipamentosTable from '../components/EquipamentosTable'
import OverduePanel from '../components/OverduePanel'
import EquipamentoForm from '../components/forms/EquipamentoForm'
import EmprestimoForm from '../components/forms/EmprestimoForm'
import { useEquipamentos } from '../hooks/useEquipamentos'
import { useColaboradores } from '../hooks/useColaboradores'
import { useEmprestimos } from '../hooks/useEmprestimos'
import { relatorioService } from '../services/relatorioService'
import { TIPOS_EQUIPAMENTO } from '../constants/tipoEquipamento'

const pct = (parte, total) => (total ? ((parte / total) * 100).toFixed(1).replace('.', ',') : '0,0')

export default function Dashboard() {
  const equip = useEquipamentos()
  const colab = useColaboradores()
  const emp = useEmprestimos()

  const [tipo, setTipo] = useState('')
  const [modal, setModal] = useState(null) // 'equipamento' | 'emprestimo'
  const [selecionado, setSelecionado] = useState(null)
  const [gerando, setGerando] = useState(false)
  const [erroRelatorio, setErroRelatorio] = useState(null)

  const total = equip.data.length
  const disponiveis = equip.data.filter((e) => e.disponivel).length
  const emprestados = total - disponiveis

  const filtrados = useMemo(
    () => equip.data.filter((e) => !tipo || e.tipo === tipo).slice(0, 4),
    [equip.data, tipo],
  )

  const abrirEmprestimo = (equipamento = null) => {
    setSelecionado(equipamento)
    setModal('emprestimo')
  }
  const fechar = () => {
    setModal(null)
    setSelecionado(null)
  }
  const baixarRelatorio = async () => {
    setGerando(true)
    setErroRelatorio(null)
    try {
      await relatorioService.baixarEmprestimos()
    } catch (e) {
      setErroRelatorio(e.userMessage)
    } finally {
      setGerando(false)
    }
  }
  const recarregar = () => {
    fechar()
    equip.reload()
    emp.reload()
  }

  return (
    <>
      <PageHeader
        eyebrow="Painel de controle"
        title="Visão geral"
        subtitle="Acompanhe a situação dos equipamentos e empréstimos."
        action={
          <div className="page-header__actions">
            <button className="btn btn--ghost btn--lg btn--icon" onClick={baixarRelatorio} disabled={gerando}>
              <DownloadIcon />
              {gerando ? 'Gerando...' : 'Baixar relatório'}
            </button>
            <button className="btn btn--primary btn--lg" onClick={() => abrirEmprestimo()}>
              + Novo empréstimo
            </button>
          </div>
        }
      />

      {(equip.error || emp.error || erroRelatorio) && (
        <p className="banner-error">{equip.error ?? emp.error ?? erroRelatorio}</p>
      )}

      <section className="stats">
        <StatCard icon={<BoxIcon />} tone="blue" label="Total de equipamentos" value={total} caption="Patrimônio cadastrado" />
        <StatCard
          icon={<CheckIcon />}
          tone="green"
          label="Disponíveis"
          value={disponiveis}
          caption={`${pct(disponiveis, total)}% do total`}
        />
        <StatCard
          icon={<SwapIcon />}
          tone="purple"
          label="Emprestados"
          value={emprestados}
          caption={`${pct(emprestados, total)}% do total`}
        />
        <StatCard
          icon={<AlertIcon />}
          tone="red"
          label="Em atraso"
          value={emp.atrasados.length}
          caption="Requer atenção"
        />
      </section>

      <section className="dash-grid">
        <div className="card">
          <div className="card__head">
            <div>
              <h2>Equipamentos</h2>
              <p>Status atual do patrimônio</p>
            </div>
            <div className="card__tools">
              <select className="select-sm" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Todos os tipos</option>
                {TIPOS_EQUIPAMENTO.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <button className="btn btn--primary btn--sm" onClick={() => setModal('equipamento')}>
                + Cadastrar
              </button>
            </div>
          </div>

          <EquipamentosTable equipamentos={filtrados} onEmprestar={abrirEmprestimo} />

          <div className="card__foot">
            <span>
              Exibindo {filtrados.length} de {total} equipamentos
            </span>
            <Link to="/equipamentos">Ver todos →</Link>
          </div>
        </div>

        <OverduePanel atrasados={emp.atrasados} />
      </section>

      <h2 className="section-title">Ações rápidas</h2>
      <section className="quick">
        <button className="quick__item" onClick={() => setModal('equipamento')}>
          <span className="quick__icon tone-blue">
            <BoxIcon />
          </span>
          <span>
            <strong>Cadastrar equipamento</strong>
            <small>Adicionar patrimônio</small>
          </span>
          <ArrowRight width={16} height={16} />
        </button>
        <Link to="/colaboradores" className="quick__item">
          <span className="quick__icon tone-purple">
            <UserIcon />
          </span>
          <span>
            <strong>Cadastrar colaborador</strong>
            <small>Endereço via CEP</small>
          </span>
          <ArrowRight width={16} height={16} />
        </Link>
        <Link to="/emprestimos" className="quick__item">
          <span className="quick__icon tone-green">
            <SwapIcon />
          </span>
          <span>
            <strong>Registrar devolução</strong>
            <small>Finalizar empréstimo</small>
          </span>
          <ArrowRight width={16} height={16} />
        </Link>
      </section>

      <Modal open={modal === 'equipamento'} title="Cadastrar equipamento" onClose={fechar}>
        <EquipamentoForm onSaved={recarregar} onCancel={fechar} />
      </Modal>
      <Modal open={modal === 'emprestimo'} title="Novo empréstimo" onClose={fechar}>
        <EmprestimoForm
          equipamentos={equip.data}
          colaboradores={colab.data}
          equipamentoId={selecionado?.id}
          onSaved={recarregar}
          onCancel={fechar}
        />
      </Modal>
    </>
  )
}
