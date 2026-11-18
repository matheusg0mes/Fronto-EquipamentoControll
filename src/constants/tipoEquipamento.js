// Espelha o enum TipoEquipamento do backend.
export const TIPOS_EQUIPAMENTO = [
  { value: 'NOTEBOOK', label: 'Notebook' },
  { value: 'MONITOR', label: 'Monitor' },
  { value: 'HEADSET', label: 'Headset' },
  { value: 'MOUSE', label: 'Mouse' },
  { value: 'TECLADO', label: 'Teclado' },
  { value: 'IMPRESSORA', label: 'Impressora' },
  { value: 'OUTROS', label: 'Outros' },
]

export const labelTipo = (value) =>
  TIPOS_EQUIPAMENTO.find((t) => t.value === value)?.label ?? value
