import { useEffect, useState } from "react";
import { AuthClient } from "src/libs/auth";

export const useAuthState = () => {
  const [state, setState] = useState({
    currentUser: {},
    isSuccess: false,
    isError: false,
  })

  // Fetch current user
  useEffect(() => {
    AuthClient.getCurrentUser()
      .then((user) => {
        setState(state => ({
          ...state,
          isSuccess: true,
          isError: false,
          currentUser: user
        }))
      })
      .catch(error => {
        setState(state => ({
          ...state,
          isError: true,
        }))
      })
  }, [])

  return state
}
