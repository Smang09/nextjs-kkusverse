import { HTMLProps } from 'react'

export const H2 = (props: HTMLProps<HTMLHeadingElement>) => (
  <h2 className="text-2xl font-semibold mt-12 mb-3 break-all" {...props} />
)

export const H3 = (props: HTMLProps<HTMLHeadingElement>) => (
  <h3 className="text-xl font-semibold mt-5 mb-2 break-all" {...props} />
)

export const H4 = (props: HTMLProps<HTMLHeadingElement>) => (
  <h4 className="text-lg font-semibold mt-4 mb-2 break-all" {...props} />
)

export const H5 = (props: HTMLProps<HTMLHeadingElement>) => (
  <h5 className="text-base font-semibold mt-3 mb-1.5 break-all" {...props} />
)

export const H6 = (props: HTMLProps<HTMLHeadingElement>) => (
  <h6 className="text-sm font-semibold mt-2 mb-1 break-all" {...props} />
)

export const P = (props: HTMLProps<HTMLParagraphElement>) => (
  <p className="leading-relaxed my-4" {...props} />
)

export const UL = (props: HTMLProps<HTMLUListElement>) => (
  <ul className="list-disc list-inside my-4 pl-4" {...props} />
)

export const LI = (props: HTMLProps<HTMLLIElement>) => <li className="mb-1" {...props} />

export const HR = (props: HTMLProps<HTMLHRElement>) => (
  <hr className="border-t border-slate-300 dark:border-zinc-700 my-11" {...props} />
)

export const A = (props: HTMLProps<HTMLAnchorElement>) => (
  <a className="text-blue-600 hover:underline dark:text-blue-400" {...props} />
)

export const Blockquote = (props: HTMLProps<HTMLQuoteElement>) => (
  <blockquote
    className="
      border-l-4 border-slate-200 dark:border-zinc-700
      bg-slate-100/50 dark:bg-zinc-800/50
      text-slate-700 dark:text-zinc-300
      pl-6 pr-5 py-1 my-6
    "
    {...props}
  />
)
