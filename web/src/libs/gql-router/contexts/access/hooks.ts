import { useContext } from 'react'
import { AccessControlContext } from './context'
import { IAccessControlContext } from './types'

type UseAccessType<T> = IAccessControlContext<T>

/**
 * @description Please, you need infer type manually
 * @returns UseAccessType<T>
 */
function useAccess<T>(): UseAccessType<T> {
  const context = useContext(AccessControlContext)

  return {
    ...context,
  }
}

export { useAccess }
