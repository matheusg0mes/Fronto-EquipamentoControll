import { NavLink, useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'
import { AlertIcon, BoxIcon, HomeIcon, LogoutIcon, SwapIcon, UserIcon } from '../ui/Icons'

const links = [
  { to: '/', label: 'Visão geral', icon: HomeIcon, end: true },
  { to: '/equipamentos', label: 'Equipamentos', icon: BoxIcon },
  { to: '/colaboradores', label: 'Colaboradores', icon: UserIcon },
  { to: '/emprestimos', label: 'Empréstimos', icon: SwapIcon },
  { to: '/atrasados', label: 'Atrasados', icon: AlertIcon },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const sair = () => {
    authService.logout()
    navigate('/login', { replace: true })
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo">
          <BoxIcon />
        </div>
        <div>
          <strong>EquipControl</strong>
          <span>Gestão de empréstimos</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>
            <Icon width={16} height={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__user">
        <div className="avatar">RS</div>
        <div>
          <strong>Administrador</strong>
          <span>ADMIN</span>
        </div>
        <button className="icon-btn icon-btn--light" aria-label="Sair" onClick={sair}>
          <LogoutIcon />
        </button>
      </div>
    </aside>
  )
}
