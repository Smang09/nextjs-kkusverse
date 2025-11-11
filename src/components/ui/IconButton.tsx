'use client'

import { ReactNode } from 'react'

interface Props {
  isActive?: boolean
  ariaLabel: string
  children: ReactNode
  onClick: () => void
}

const IconButton = ({ isActive = false, ariaLabel, children, onClick }: Props) => {
  return (
    <button
      className={`p-3 rounded-2xl cursor-pointer transition-colors ${
        isActive ? 'bg-white' : 'bg-white/10 hover:bg-white/20'
      }`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default IconButton
