import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'
import jwt from 'jsonwebtoken'

const verifyToken = (token) => {
  try {
    // Returns if the token is both valid and not expired
    const data = jwt.verify(token, process.env.TOKEN_SIGN_KEY)
    return { valid: true, expired: false, data }
  } catch (err) {
    // Returns if the token is valid but expired
    if (err && err.name === 'TokenExpiredError')
      return {
        valid: true,
        expired: true,
        data: jwt.decode(token, {
          complete: true,
        }),
      }

    // Returns if the token is not valid
    return { valid: false, expired: false, data: {} }
  }
}

export const getCurrentUser = async (_p, headers) => {
  const userToken = headers?.token
  const { valid, expired, data } = verifyToken(userToken)

  if (!valid) throw Error('Invalid Token Provided')

  if (data && typeof data !== 'string') {
    return {
      ...data,
      expired,
      // roles: data.roles
    }
  } else {
    return false
  }
}

export const requireAuth = async (_headers, token) => {
  const { valid, data } = verifyToken(token)

  if (!valid || !data) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  // if (
  //   typeof role !== 'undefined' &&
  //   typeof role === 'string' &&
  //   !context.currentUser.roles?.includes(role)
  // ) {
  //   throw new ForbiddenError("You don't have access to do that.")
  // }

  // if (!hasRole({ roles })) {
  //   throw new ForbiddenError("You don't have access to do that.")
  // }

  // if (
  //   typeof role !== 'undefined' &&
  //   Array.isArray(role) &&
  //   !context.currentUser.roles?.some((r) => role.includes(r))
  // ) {
  //   throw new ForbiddenError("You don't have access to do that.")
  // }
}

/**
 * When checking role membership, roles can be a single value, a list, or none.
 * You can use Prisma enums too (if you're using them for roles), just import your enum type from `@prisma/client`
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type AllowedRoles = string | string[] | undefined

/**
 * Checks if the currentUser is authenticated (and assigned one of the given roles)
 *
 * @param roles: AllowedRoles - Checks if the currentUser is assigned one of these roles
 *
 * @returns {boolean} - Returns true if the currentUser is logged in and assigned one of the given roles,
 * or when no roles are provided to check against. Otherwise returns false.
 */
// export const hasRole = ({ roles }: { roles: AllowedRoles }): boolean => {
//   if (!isAuthenticated()) {
//     return false
//   }

//   if (roles) {
//     if (Array.isArray(roles)) {
//       return context.currentUser.roles?.some((r) => roles.includes(r))
//     }

//     if (typeof roles === 'string') {
//       return context.currentUser.roles?.includes(roles)
//     }

//     // roles not found
//     return false
//   }

//   return true
// }
