'use client'

import { useEffect, useRef } from 'react'

// Global stack to track open modals across the entire app
const modalStack: string[] = []

/**
 * Professional-grade hook to handle browser back button for nested modals.
 * Ensures that only the TOP-MOST modal closes when 'Back' is pressed.
 */
export function useBackButtonModal(isOpen: boolean, onClose: () => void) {
  const modalIdRef = useRef<string | null>(null)
  const onCloseRef = useRef(onClose)

  // Always keep onCloseRef up to date
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!isOpen) return

    // 1. Setup: Modal opened
    const id = 'modal_' + Math.random().toString(36).substr(2, 9)
    modalIdRef.current = id
    modalStack.push(id)

    // Push a new entry to browser history
    window.history.pushState({ modalId: id }, '')

    const handlePopState = (event: PopStateEvent) => {
      // If we are open, and we are the top-most modal in the stack
      if (modalStack[modalStack.length - 1] === id) {
        // If the state we just landed on doesn't match our ID, it means we were popped
        if (event.state?.modalId !== id) {
          modalStack.pop()
          onCloseRef.current()
        }
      }
    }

    window.addEventListener('popstate', handlePopState)

    // 2. Cleanup: Modal closing
    return () => {
      window.removeEventListener('popstate', handlePopState)
      
      const index = modalStack.indexOf(id)
      if (index !== -1) {
        // Remove ourselves from the global stack
        modalStack.splice(index, 1)
        
        // If we were closed manually (not via back button), we must pop the history state
        if (window.history.state?.modalId === id) {
          window.history.back()
        }
      }
      modalIdRef.current = null
    }
  }, [isOpen])
}
