'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import InputWithClear from '@/components/ui/InputWithClear'
import DrawCards from './DrawCards'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid'
import { CheckCircleIcon as CheckCircleIconOutline } from '@heroicons/react/24/outline'

interface FormData {
  title: string
  items: string
  count: number
  excludeUsed: boolean
}

const MIN_ITEMS = 2
const MIN_COUNT = 1

const MultiRandomPicker = () => {
  const t = useTranslations('tools.randomPicker')
  const title = t('title')

  const [items, setItems] = useState<string[]>([])
  const isReady = items.length >= MIN_ITEMS

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title,
      items: '',
      count: 1,
      excludeUsed: false,
    },
  })

  const titleValue = watch('title')
  const itemsValue = watch('items')
  const countValue = watch('count')
  const excludeUsedValue = watch('excludeUsed')

  const onSubmit = (data: FormData) => {
    const newItems = data.items
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0)

    if (newItems.length < MIN_ITEMS) {
      setError('items', { message: t('input.itemsError') })
      return
    }

    if (data.count >= newItems.length) {
      setError('count', { message: t('input.countError') })
      return
    }

    setItems(newItems)
  }

  const handleReset = () => setItems([])

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h2 className="w-full max-w-md mb-10 text-2xl font-bold text-center break-all">
        {titleValue || title}
      </h2>
      {isReady ? (
        <>
          <div className="w-full max-w-4xl">
            <DrawCards items={items} count={countValue} excludeUsed={excludeUsedValue} />
          </div>
          <button
            type="button"
            className="w-full max-w-md mt-4 py-2 px-4 border border-slate-300 hover:bg-slate-100 dark:border-zinc-700 dark:hover:bg-zinc-800 rounded-xl cursor-pointer"
            onClick={handleReset}
          >
            {t('input.reset')}
          </button>
        </>
      ) : (
        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <InputWithClear<FormData>
            id="title"
            label={t('input.titleGuide')}
            placeholder={title}
            value={titleValue}
            register={register}
            clear={() => setValue('title', '')}
          />
          <InputWithClear<FormData>
            id="items"
            label={t('input.itemsGuide')}
            placeholder={t('input.placeholder')}
            value={itemsValue}
            register={register}
            clear={() => setValue('items', '')}
            error={errors.items?.message}
          />
          <div>
            <label htmlFor="count" className="block mb-2">
              {t('input.countGuide')}
            </label>
            <input
              id="count"
              type="number"
              min={MIN_COUNT}
              {...register('count')}
              onBlur={(e) => {
                const num = Number(e.target.value)
                if (!num || num < MIN_COUNT) {
                  setValue('count', MIN_COUNT)
                }
              }}
              className="w-full px-3 py-2 border border-slate-300 dark:border-zinc-700 rounded-xl"
            />
            {errors.count && <p className="text-red-400 mt-2 text-sm">{errors.count.message}</p>}
          </div>
          <label className="flex items-center w-fit gap-1 cursor-pointer">
            {excludeUsedValue ? (
              <CheckCircleIconSolid className="size-5 text-blue-500" />
            ) : (
              <CheckCircleIconOutline className="size-5 text-slate-400 dark:text-zinc-600" />
            )}
            <input
              type="checkbox"
              {...register('excludeUsed')}
              className="appearance-none size-0"
            />
            {t('input.excludeUsed')}
          </label>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 cursor-pointer"
          >
            {t('picker.ready')}
          </button>
        </form>
      )}
    </div>
  )
}

export default MultiRandomPicker
