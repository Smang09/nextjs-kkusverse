'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import SlotMachine from './SlotMachine'
import InputWithClear from '@/components/ui/InputWithClear'

interface FormData {
  title: string
  items: string
}

const MIN_ITEMS = 2

const RandomPicker = () => {
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
    defaultValues: { title, items: '' },
  })

  const titleValue = watch('title')
  const itemsValue = watch('items')

  const onSubmit = (data: FormData) => {
    const newItems = data.items
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0)

    if (newItems.length < MIN_ITEMS) {
      setError('items', { message: t('input.itemsError') })
    } else {
      setItems(newItems)
    }
  }

  const handleReset = () => setItems([])

  return (
    <div className="w-full max-w-md">
      <h2 className="mb-10 text-2xl font-bold text-center break-all">{titleValue || title}</h2>
      {isReady ? (
        <>
          <SlotMachine items={items} />
          <button
            type="button"
            className="w-full mt-4 py-2 px-4 border border-slate-300 hover:bg-slate-100 dark:border-zinc-700 dark:hover:bg-zinc-800 rounded-xl cursor-pointer"
            onClick={handleReset}
          >
            {t('input.reset')}
          </button>
        </>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-xl border border-transparent bg-blue-500 text-white font-semibold hover:bg-blue-600 cursor-pointer"
          >
            {t('picker.ready')}
          </button>
        </form>
      )}
    </div>
  )
}

export default RandomPicker
