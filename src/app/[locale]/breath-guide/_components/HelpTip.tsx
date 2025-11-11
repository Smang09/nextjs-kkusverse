'use client'

import { XMarkIcon } from '@heroicons/react/24/solid'
import { useMessages } from 'next-intl'
import { useRouter } from 'next/navigation'

type Tip = { title: string; description: string[] }

const HelpTip = () => {
  const router = useRouter()
  const messages: Tip[] = useMessages().tools.breathGuide.tips
  const handleClose = () => router.back()
  return (
    <div className="absolute bottom-4 left-20 flex flex-col w-[calc(100dvw-96px)] max-w-100 max-h-[calc(100dvh-68px)] p-6 border-1 border-slate-300 bg-white text-black rounded-2xl z-10">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">Tip</h2>
        <button className="cursor-pointer" onClick={handleClose}>
          <XMarkIcon className="size-6" />
        </button>
      </div>
      <ul className="space-y-4 mt-5 overflow-auto">
        {messages.map(({ title, description }, idx) => (
          <li key={idx}>
            <h3 className="font-bold mb-1">{title}</h3>
            {description.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HelpTip
