import { db } from 'src/lib/db'
import { useHashedPassword } from 'src/utils/encrypt'
import { AuthenticationError } from '@redwoodjs/graphql-server'
import { createCustomer } from 'src/services/customers/customers'
import { readFileSync } from 'src/utils/file'
import { sendEmail } from 'src/lib/mail'

export const handler = async (event) => {
  // Get user from request body
  const { name, email, password, user_type, address, phone_number } =
    JSON.parse(event.body)

  if (name && email && password && user_type) {
    // Encrypt password
    const encryptedPassword = useHashedPassword(password)
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (user) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          errors: [{ message: `Email already exists` }],
        }),
      }
    }

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password,
        hashedPassword: encryptedPassword.hashPassword,
        salt: encryptedPassword.salt,
        user_type,
        address,
        phone_number,
      },
    })
    const isCustomer = newUser.user_type !== 'admin'

    if (isCustomer) {
      // Customer table
      await createCustomer({
        input: {
          user: {
            connect: {
              id: newUser.id,
            },
          },
        },
      })

      // Send email to customer
      const fileContents = readFileSync('/signup/signup.template.html')
      await sendEmail({
        to: newUser.email,
        subject: 'Thank you for signing up',
        html: fileContents,
      })
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: newUser?.id,
        name,
        email,
        user_type,
        address,
        phone_number,
      }),
    }
  } else {
    throw new AuthenticationError('Some missing field!')
  }
}
