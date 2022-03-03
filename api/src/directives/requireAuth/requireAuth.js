import gql from 'graphql-tag'

import { createValidatorDirective } from '@redwoodjs/graphql-server'

import { requireAuth as applicationRequireAuth } from 'src/lib/auth'

export const schema = gql`
  """
  Use to check whether or not a user is authenticated and is associated
  with an optional set of roles.
  """
  directive @requireAuth(roles: [String]) on FIELD_DEFINITION
`
// DONT REMOVE THIS
// const validate = ({ directiveArgs }, token) => {
//   const { roles } = directiveArgs
//   applicationRequireAuth({ roles })
// }

const requireAuth = createValidatorDirective(
  schema,
  ({ context: userContext }) => {
    const { event } = userContext
    const headers = event.headers
    const authorization = headers.authorization

    const tokenizes = Array.from(authorization.split(' '))
    if (tokenizes.length) {
      const token = tokenizes[1]
      if (token) {
        applicationRequireAuth(headers, token)
      }
    }
  }
)

export default requireAuth
