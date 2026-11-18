import { useEffect } from 'react'
import { CloseIcon } from './Icons'

export default function Modal({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal__head">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Fechar">
            <CloseIcon />
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  )
}
