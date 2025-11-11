import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  title?: string
}

const BottomSheet = ({ children, title }: Props) => {
  return (
    <div className="flex flex-col max-h-[80vh] px-4 py-6 sm:px-6 sm:py-8 rounded-t-2xl shadow-lg bg-white dark:bg-zinc-800 break-words">
      {title && <div>{title}</div>}
      <div className="overflow-y-auto">{children}</div>
    </div>
  )
}

export default BottomSheet
