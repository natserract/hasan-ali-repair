import { useEffect, useState } from 'react'
import { AuthClient } from 'src/libs/auth'

export type CurrentUser = {
  id: number
  address: string
  email: string
  phone_number: string
  user_type: 'admin' | 'customer'
  exp?: number
  iat?: number
}

export const useAuthState = () => {
  const [state, setState] = useState({
    currentUser: {} as CurrentUser,
    isSuccess: false,
    isError: false,
  })

  // Fetch current user
  useEffect(() => {
    AuthClient.getCurrentUser()
      .then((user) => {
        setState((state) => ({
          ...state,
          isSuccess: true,
          isError: false,
          currentUser: user,
        }))
      })
      .catch((error) => {
        setState((state) => ({
          ...state,
          isError: true,
        }))
      })
  }, [])

  return state
}
