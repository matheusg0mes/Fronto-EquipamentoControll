const MS_DIA = 24 * 60 * 60 * 1000

// "2026-11-04" -> Date local (evita bug de fuso do new Date("YYYY-MM-DD"))
function parseISO(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function hojeISO() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function formatarData(iso) {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export function diasDeAtraso(emprestimo) {
  if (emprestimo.dataDevolucao || !emprestimo.dataPrevistaDevolucao) return 0
  const hoje = parseISO(hojeISO())
  const prevista = parseISO(emprestimo.dataPrevistaDevolucao)
  return Math.max(0, Math.round((hoje - prevista) / MS_DIA))
}

export const estaAtrasado = (e) => diasDeAtraso(e) > 0
export const estaAberto = (e) => !e.dataDevolucao

export const textoDias = (n) => `${n} ${n === 1 ? 'dia' : 'dias'}`
