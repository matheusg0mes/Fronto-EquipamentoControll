import { useMemo } from 'react'
import { emprestimoService } from '../services/emprestimoService'
import { estaAberto, estaAtrasado, diasDeAtraso } from '../utils/emprestimo'
import { useResource } from './useResource'

export function useEmprestimos() {
  const resource = useResource(emprestimoService.listar)

  const derived = useMemo(() => {
    const abertos = resource.data.filter(estaAberto)
    const atrasados = abertos
      .filter(estaAtrasado)
      .sort((a, b) => diasDeAtraso(b) - diasDeAtraso(a))
    return { abertos, atrasados }
  }, [resource.data])

  return { ...resource, ...derived }
}
