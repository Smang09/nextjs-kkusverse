import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getCategoryList } from '@/lib/post'

interface Props {
  category?: string
}

const CategoryList = ({ category = '' }: Props) => {
  const t = useTranslations('blog.category')
  const categoryList = getCategoryList()
  const items = categoryList.reduce<Array<{ label: string; link: string; count: number }>>(
    (acc, { name, count }) => {
      acc.push({ label: t(name), link: name, count })
      acc[0].count += count
      return acc
    },
    [{ label: t('all'), link: '', count: 0 }],
  )

  return (
    <div>
      <h2 className="text-slate-900 dark:text-white font-bold">Category</h2>
      <ul className="flex flex-wrap gap-2 mt-2">
        {items.map(({ label, link, count }) => {
          const isActive = category === link
          return (
            <li key={label} className="shrink-0">
              <Link
                href={`/blog/${link}`}
                className={`flex gap-x-1 items-center py-1 px-3 border rounded-lg shadow ${
                  isActive
                    ? 'border-slate-700 bg-slate-700 pointer-events-none'
                    : 'border-slate-300 hover:border-slate-400 dark:border-zinc-700 dark:hover:border-zinc-600'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-disabled={isActive}
              >
                <span
                  className={`text-sm font-medium ${
                    isActive ? 'text-white' : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`text-xs ${
                    isActive ? 'text-white' : 'text-slate-600 dark:text-zinc-300'
                  }`}
                >
                  ({count})
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CategoryList
