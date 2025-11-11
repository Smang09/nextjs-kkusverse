'use client'

import { useEffect, useRef } from 'react'
import { FocusTrap } from 'focus-trap-react'
import useClickOutside from '@/hooks/useClickOutside'
import useBottomSheetStore from '@/stores/useBottomSheetStore'
import useAnimation from '@/hooks/useAnimation'
import BottomSheet from '@/components/BottomSheet'

const BottomSheetProvider = () => {
  const bottomSheetRef = useRef(null)
  const { isOpen, title, children, close } = useBottomSheetStore()
  const { shouldRender, animationTrigger, isAnimating, onTransitionEnd } = useAnimation(isOpen)
  const focusActive = isOpen && !isAnimating && animationTrigger

  useClickOutside(bottomSheetRef, () => {
    if (focusActive) close()
  })

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [isOpen])

  if (!shouldRender) return null

  return (
    <FocusTrap active={focusActive}>
      <div className="z-1">
        <div
          className={`fixed top-0 left-0 size-full bg-black/30 transition-opacity ${
            animationTrigger ? 'opacity-100' : 'opacity-0'
          }`}
          onTransitionEnd={onTransitionEnd}
        />
        <div
          ref={bottomSheetRef}
          className={`fixed bottom-0 left-0 w-full transition-transform ${
            animationTrigger ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <BottomSheet title={title}>{children}</BottomSheet>
        </div>
      </div>
    </FocusTrap>
  )
}

export default BottomSheetProvider
