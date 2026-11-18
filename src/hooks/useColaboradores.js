import { colaboradorService } from '../services/colaboradorService'
import { useResource } from './useResource'

export const useColaboradores = () => useResource(colaboradorService.listar)
