import { toast } from '@redwoodjs/web/toast'

export const toastPromise = async (
  message: string,
  type: 'success' | 'error' | 'loading',
  duration = 3000
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const toastFn = toast[type]
      resolve(
        toastFn(message, {
          duration,
        })
      )
    }, duration)
  })
}
