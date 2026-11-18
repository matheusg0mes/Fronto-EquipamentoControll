import { equipamentoService } from '../services/equipamentoService'
import { useResource } from './useResource'

export const useEquipamentos = () => useResource(equipamentoService.listar)
