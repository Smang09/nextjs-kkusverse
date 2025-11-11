'use client'

import { ReactNode } from 'react'
import { create } from 'zustand'

type params = {
  title?: string
  children: ReactNode
}

type Store = {
  isOpen: boolean
  children: ReactNode
  title?: string
  open: (params: params) => void
  close: () => void
}

const initialState = {
  isOpen: false,
  children: null,
  title: '',
}

const useBottomSheetStore = create<Store>((set) => ({
  ...initialState,
  open: ({ title, children }: params) => set({ isOpen: true, title, children }),
  close: () => set({ isOpen: false }),
}))

export default useBottomSheetStore
