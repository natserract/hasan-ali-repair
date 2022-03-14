import { db } from 'src/lib/db'
import { useHashedPassword } from 'src/utils/encrypt'

export const handler = async (event) => {
  const { email, new_password } = JSON.parse(event.body)

  if (email && new_password) {
    // Encrypt password
    const encryptedPassword = useHashedPassword(new_password)

    // Find email is exist or not
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          errors: [{ message: `Email not found!` }],
        }),
      }
    }

    const updateUser = await db.user.update({
      data: {
        password: new_password,
        hashedPassword: encryptedPassword.hashPassword,
        salt: encryptedPassword.salt,
      },
      where: {
        email,
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: updateUser?.id,
        email,
      }),
    }
  }
}
