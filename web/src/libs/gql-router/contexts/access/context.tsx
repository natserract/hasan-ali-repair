import {
  createContext,
  createElement,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { IAccessControlContext, IGenericAccessControl } from './types'
import jwt from 'jsonwebtoken'
import { useAuth } from '@redwoodjs/auth'

export const AccessControlContext = createContext<IAccessControlContext>({
  access: {},
  currentRole: '',
})

type AccessControlContextProps<T> = {
  access: IGenericAccessControl<T>
  children?: React.ReactNode
}

export function AccessControlContextProvider<T>(
  props: AccessControlContextProps<T>
) {
  const { userMetadata } = useAuth()
  const [roleState, setRoleState] = useState('')

  useEffect(() => {
    if (userMetadata) {
      if (userMetadata.accessToken) {
        const { accessToken } = userMetadata
        const { user_type } = jwt.decode(accessToken) as jwt.JwtPayload
        setRoleState(user_type)
      }
    }
  }, [userMetadata])

  const value = useMemo(() => {
    if (roleState) {
      return {
        access: props.access,
        currentRole: roleState,
      }
    }
  }, [roleState, props.access])

  return createElement(AccessControlContext.Provider, { value }, props.children)
}
