'use client'

import { useState, useRef } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import useClickOutside from '@/hooks/useClickOutside'

type Option<T> = {
  label: string
  value: T
}

interface Props<T> {
  label?: string
  value: T
  options: Option<T>[]
  placeholder?: string
  className?: string
  onChange: (val: T) => void
}

const CustomSelect = <T extends string | number>({
  label,
  value,
  options,
  placeholder = 'Select an option',
  className = '',
  onChange,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find((opt) => opt.value === value)

  const toggleOpen = () => setIsOpen((prev) => !prev)
  const handleChange = (value: T) => {
    onChange(value)
    setIsOpen(false)
  }

  useClickOutside(ref, () => setIsOpen(false))

  return (
    <div ref={ref} className={`relative inline-block w-48 ${className}`}>
      <div className="flex items-center gap-3">
        {label && <label className="text-slate-500 dark:text-zinc-300 shrink-0">{label}</label>}
        <button
          type="button"
          onClick={toggleOpen}
          className="w-full px-3 py-2 flex items-center justify-between gap-3
                    border border-slate-300 dark:border-zinc-700
                  hover:border-slate-400 dark:hover:border-zinc-600
                  bg-white dark:bg-zinc-900 text-slate-800 dark:text-white
                    focus:outline-none focus:ring focus:ring-indigo-600
                    rounded-lg shadow cursor-pointer"
        >
          <span>{selected ? selected.label : placeholder}</span>
          <ChevronDownIcon className={`size-4 transition ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {isOpen && (
        <ul
          className="absolute left-0 mt-1 w-full
                    border border-slate-300 dark:border-zinc-700
                    bg-white dark:bg-zinc-900
                    rounded-lg shadow overflow-hidden z-1"
        >
          {options.map((opt) => (
            <li
              key={String(opt.value)}
              onClick={() => handleChange(opt.value)}
              className={`px-3 py-2 cursor-pointer transition
                ${
                  value === opt.value
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-800 dark:text-white'
                }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CustomSelect
