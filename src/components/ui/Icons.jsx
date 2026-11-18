const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const make = (children) =>
  function Icon(props) {
    return (
      <svg {...base} {...props} aria-hidden="true">
        {children}
      </svg>
    )
  }

export const HomeIcon = make(<path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />)
export const BoxIcon = make(
  <>
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M8 21h8M12 18v3" />
  </>,
)
export const UserIcon = make(
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </>,
)
export const SwapIcon = make(<path d="M7 7h13l-3-3M17 17H4l3 3" />)
export const AlertIcon = make(
  <>
    <path d="M12 3l10 18H2z" />
    <path d="M12 10v5M12 18h.01" />
  </>,
)
export const CheckIcon = make(<path d="M5 13l4 4L19 7" />)
export const LogoutIcon = make(
  <>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5M21 12H9" />
  </>,
)
export const ArrowRight = make(<path d="M5 12h14M13 6l6 6-6 6" />)
export const CloseIcon = make(<path d="M6 6l12 12M18 6L6 18" />)
export const ExclamationIcon = make(<path d="M12 6v8M12 18h.01" />)
export const DownloadIcon = make(
  <>
    <path d="M12 3v12M7 10l5 5 5-5" />
    <path d="M5 21h14" />
  </>,
)
