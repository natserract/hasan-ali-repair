import { useEffect, useState } from 'react'
import { AuthClient } from 'src/libs/auth'

export type CurrentUser = {
  id: number
  name: string
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
    const user = AuthClient.getCurrentUser()

    if (user) {
      setState((state) => ({
        ...state,
        isSuccess: true,
        isError: false,
        currentUser: user,
      }))
    } else {
      setState((state) => ({
        ...state,
        isError: true,
      }))
    }
  }, [])

  return state
}
