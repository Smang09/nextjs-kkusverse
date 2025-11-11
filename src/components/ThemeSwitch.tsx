'use client'

import React, { useState, useEffect, useRef, ComponentType, SVGProps } from 'react'
import { useTheme } from 'next-themes'
import { Cog6ToothIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import useClickOutside from '@/hooks/useClickOutside'

type THEME = 'light' | 'dark' | 'system'

interface OPTION {
  value: THEME
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

const OPTIONS: OPTION[] = [
  { value: 'light', label: 'Light', icon: SunIcon },
  { value: 'dark', label: 'Dark', icon: MoonIcon },
  { value: 'system', label: 'System', icon: Cog6ToothIcon },
]

const ThemeSwitch = () => {
  const ref = useRef(null)

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useClickOutside(ref, () => setIsOpen(false))

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const selected = OPTIONS.find(({ value }) => value === theme)

  const handleChangeTheme = (theme: THEME) => {
    setTheme(theme)
    setIsOpen(false)
  }

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full cursor-pointer"
        aria-label="Toggle Theme"
      >
        {selected && <selected.icon className="size-5" />}
      </button>
      {isOpen && (
        <ul className="border-slate-300 bg-white dark:border-zinc-700 dark:bg-zinc-900 absolute right-0 z-10 mt-2 p-1 border rounded-lg shadow overflow-hidden">
          {OPTIONS.map(({ value, label, icon: Icon }) => (
            <li
              key={value}
              onClick={() => handleChangeTheme(value)}
              className="flex justify-between items-center gap-2.5 p-2 pr-3 rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-800"
            >
              <div className="flex items-center justify-center gap-2.5 text-slate-800 dark:text-white">
                <Icon className="size-4" />
                <span className="text-sm">{label}</span>
              </div>
              {value === selected?.value && (
                <div className="size-1 bg-slate-700 dark:bg-white rounded-full" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ThemeSwitch
