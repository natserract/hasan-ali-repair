import { HttpLink, ApolloLink, concat } from '@apollo/client'
import { GRAPHQL_URL, API_URL } from 'src/constant/endpoint'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { storageKey } from './config'

/**
 * ApolloClient middleware to check for token expiracy and refreshing
 */
const AuthMiddleware = () => {
  const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
  })

  const authMiddleware = new ApolloLink((operation, forward) => {
    try {
      const token = JSON.parse(localStorage.getItem(storageKey)).accessToken
      const { exp } = jwt.decode(token) as jwt.JwtPayload

      // Checks if access token has expired and refreshs tokens before proceeding
      if (exp * 1000 < Date.now()) {
        axios.get(`${API_URL}/refresh`).then((data) => {
          localStorage.setItem(storageKey, JSON.stringify(data?.data?.data))
        })
      }
    } catch (err) {
      console.error(err)
    }

    // Set headers for next operation
    operation.setContext({
      headers: {
        'auth-provider': 'custom',
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem(storageKey)).accessToken
        }`,
      },
    })

    return forward(operation)
  })

  return { link: concat(authMiddleware, httpLink) }
}

export { AuthMiddleware }
