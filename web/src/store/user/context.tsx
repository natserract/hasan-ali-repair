import { useAuth } from "@redwoodjs/auth";
import { createContext, createElement, useCallback, useEffect, useMemo, useState } from "react";
import { IUserContext } from "./types";
import { REDWOOD_USERQUERY } from './query'
import { useQuery } from "@redwoodjs/web";
import { useLazyQuery } from '@apollo/react-hooks'

const UserContext = createContext<IUserContext>({
  currentUser: null
})

export const UserContextProvider = ({ children }) => {
  const { isAuthenticated, userMetadata } = useAuth()

  const [userId, setUserId] = useState<number>()
  // const {
  //   data: userQuery,
  //   loading: loadingUserQuery,
  //   error: errorUserQuery,
  // } = useQuery(REDWOOD_USERQUERY, {
  //   variables: {
  //     id: userId
  //   },
  //   // skip: true,
  // })
  const [getUser, { called, loading, refetch }] = useLazyQuery(
    REDWOOD_USERQUERY,
    {
      variables: {
        id: 25
      },
    }
  )

  const handleUserQueryId = useCallback(() => {
    if (userMetadata) {
      const isInstance = userMetadata instanceof Object;

      if (!isInstance) {
        setUserId(+userMetadata)

        const isReady = !loading && !called

        if (isReady) {
          getUser()
            .then(response => {
              console.log('response', response.data, isAuthenticated)
            })
            .catch((err) => console.error(err))
        }
      }
    }
  }, [userMetadata, isAuthenticated])

  useEffect(handleUserQueryId, [handleUserQueryId])

  const [userState, setUserState] = useState<IUserContext>()

  useEffect(() => {
    const isReady = userId && !loading && !called

    if (isReady) {

    }
    // console.log('loadingUserQuery', loadingUserQuery)
    // if (loadingUserQuery) return;
    // if (errorUserQuery) return;
    // if (userQuery) {
    //   console.log('userQuery', userQuery)
    //   setUserState({
    //     currentUser: userQuery,
    //   })
    // }
  }, [
    userId,
    loading,
    called
  ])

  useEffect(() => {
    console.log('userState', userState)
  }, [userState])

  const value = useMemo(() => userState, [userState])
  return createElement(UserContext.Provider, { value }, children)
}
