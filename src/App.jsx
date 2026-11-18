import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Equipamentos from './pages/Equipamentos'
import Colaboradores from './pages/Colaboradores'
import Emprestimos from './pages/Emprestimos'
import Atrasados from './pages/Atrasados'
import Login from './pages/Login'
import PrivateRoute from './components/auth/PrivateRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="equipamentos" element={<Equipamentos />} />
          <Route path="colaboradores" element={<Colaboradores />} />
          <Route path="emprestimos" element={<Emprestimos />} />
          <Route path="atrasados" element={<Atrasados />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  )
}
