'use client'

import useBottomSheetStore from '@/stores/useBottomSheetStore'

const BottomSheetButton = () => {
  const { open, close } = useBottomSheetStore()
  return (
    <button
      type="button"
      className="px-4 py-2 border border-slate-300 dark:border-zinc-700 rounded bg-slate-100 dark:bg-zinc-800 text-sm cursor-pointer"
      onClick={() =>
        open({
          children: (
            <>
              <div>이제 Bottom Sheet를 사용할 수 있어요! 🎉</div>
              <button
                type="button"
                className="mt-4 px-4 py-2 border border-slate-300 dark:border-zinc-700 rounded bg-slate-100 dark:bg-zinc-800 text-sm cursor-pointer"
                onClick={close}
              >
                확인
              </button>
            </>
          ),
        })
      }
    >
      Open Bottom Sheet
    </button>
  )
}

export default BottomSheetButton
