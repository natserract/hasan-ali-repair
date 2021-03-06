import { ApolloError } from '@apollo/client'
import { GraphQLError } from 'graphql'

export function extractError(
  error: null | Error | ApolloError | GraphQLError
): null | Error | GraphQLError {
  return (
    (error &&
      'graphQLErrors' in error &&
      error.graphQLErrors &&
      error.graphQLErrors.length &&
      error.graphQLErrors[0]) ||
    error
  )
}

export function getExceptionFromError(
  error: null | Error | ApolloError | GraphQLError
): Error | null {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const graphqlError: GraphQLError = extractError(error)
  const exception =
    graphqlError && graphqlError.extensions && graphqlError.extensions.exception
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return exception || graphqlError || error
}

export function getCodeFromError(
  error: null | Error | ApolloError | GraphQLError
): null | string {
  const err = getExceptionFromError(error)
  return (err && err['code']) || null
}
