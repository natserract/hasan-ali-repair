import { db } from 'src/lib/db'
import jwt from 'jsonwebtoken'
import type { Prisma } from '@prisma/client'

/**
 * Verifies if token is valid
 * @param {*} token
 */
const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SIGN_KEY)
      resolve(decoded)
    } catch (err) {
      reject(err)
    }
  })

export const handler = async (event) => {
  const { token } = JSON.parse(event.body)

  // Removes refresh token from user db entry, if provided token is valid
  const verifyUser = (await verifyToken(token)) as Prisma.UserCreateInput
  if (verifyUser) {
    await db.user.update({
      data: { refreshToken: null },
      where: { email: verifyUser?.email },
    })
  }

  const now = new Date()

  // Expires token on cookies
  return {
    statusCode: 200,
    // Expire auth coockie headers
    headers: {
      'set-cookie': [`refreshToken=; Path=/; expires=${now.toUTCString()};`],
    },
  }
}
