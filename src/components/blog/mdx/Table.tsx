import { HTMLProps } from 'react'

export const Table = (props: HTMLProps<HTMLTableElement>) => (
  <div className="w-full overflow-x-auto my-3 sm:max-w-fit sm:min-w-md">
    <table className="w-full border-collapse text-sm text-left" {...props} />
  </div>
)

export const Thead = (props: HTMLProps<HTMLTableSectionElement>) => (
  <thead className="bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-zinc-100" {...props} />
)

export const Tr = (props: HTMLProps<HTMLTableRowElement>) => (
  <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/50" {...props} />
)

export const Th = (props: HTMLProps<HTMLTableCellElement>) => (
  <th
    className="px-4 py-2 font-semibold border-b border-slate-300 dark:border-zinc-700 text-nowrap"
    {...props}
  />
)

export const Td = (props: HTMLProps<HTMLTableCellElement>) => (
  <td
    className="px-4 py-2 border-b border-slate-200 dark:border-zinc-800 whitespace-nowrap"
    {...props}
  />
)
