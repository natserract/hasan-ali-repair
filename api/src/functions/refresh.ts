import { db } from 'src/lib/db'
import jwt from 'jsonwebtoken'
import type { Prisma } from '@prisma/client'
import to from 'await-to-js'

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

export const handler = async (event, context) => {
  // Gets refresh token from headers. Throws if non available
  const { refreshToken } = (event.headers.cookie || '')
    .split(';')
    .reduce((acc, el) => {
      const [k, v] = el.split('=')
      acc[k] = v
      return acc
    }, {})
  if (!refreshToken) return { statusCode: 400 }

  // Verifies if refresh token isnt expired. Throws if it is
  const [err, {
    id,
    email,
    name,
    address,
    phone_number,
    user_type,
    exp } = {} as any] = await to(
      verifyToken(refreshToken)
    )
  if (err || exp * 1000 < Date.now()) return { statusCode: 400 }

  // Compares refreshToken with the one stored on the db. Throws if they dont match
  const { refreshToken: dbRefreshToken } = await db.user.findUnique({
    where: { email },
  })
  if (refreshToken !== dbRefreshToken) return { statusCode: 400 }

  // Generates new pair of tokens
  const accessToken = jwt.sign(
    {
      id,
      email,
      name,
      address,
      phone_number,
      user_type,
    },
    process.env.TOKEN_SIGN_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    }
  )
  const newRefreshToken = jwt.sign(
    {
      id,
      email,
      name,
      address,
      phone_number,
      user_type,
    },
    process.env.TOKEN_SIGN_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    }
  )
  // Update current user with refreshToken
  await db.user.update({
    data: { refreshToken: newRefreshToken },
    where: { email },
  })

  return {
    statusCode: 200,
    headers: {
      'set-cookie': [`refreshToken=${newRefreshToken}; Path=/; HttpOnly`],
    },
    body: JSON.stringify({
      data: {
        accessToken,
      },
    }),
  }
}
