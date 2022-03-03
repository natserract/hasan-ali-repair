import { db } from 'src/lib/db'
import jwt from 'jsonwebtoken'
import { comparePassword } from 'src/utils/encrypt'

export const handler = async (event) => {
  // Get user data from request body
  const { email, password } = event.queryStringParameters
  console.log('event.queryStringParameters', event.queryStringParameters)

  const user = await db.user.findUnique({
    where: {
      email,
    },
  })

  // Throws if user cant be found with given credentials
  if (!user)
    return {
      statusCode: 400,
      body: JSON.stringify({
        errors: [{ message: `Wrong Credentials Provided` }],
      }),
    }

  // Deconstruct User Data
  const { id, name, address, phone_number, user_type, salt } = user

  // Check if passwords match. Throws if they dont
  const match = comparePassword(
    { salt, text: password },
    user['hashedPassword']
  )
  if (!match)
    return {
      statusCode: 400,
      body: JSON.stringify({
        errors: [{ message: `Wrong Credentials Provided` }],
      }),
    }

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
  const refreshToken = jwt.sign(
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
    data: { refreshToken },
    where: { email },
  })

  return {
    statusCode: 200,
    // Set auth cookies on response headers
    headers: {
      'set-cookie': [`refreshToken=${refreshToken}; Path=/; HttpOnly`],
    },
    body: JSON.stringify({
      data: {
        accessToken,
      },
    }),
  }
}
