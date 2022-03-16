import type { Prisma } from '@prisma/client'
import { ResolverArgs, ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { useHashedPassword } from 'src/utils/encrypt'
import { createCustomer } from '../customers/customers'

export const users = () => {
  return db.user.findMany({
    orderBy: {
      created_at: 'desc',
    },
  })
}

export const user = ({ id }: Prisma.UserWhereUniqueInput) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const currentUser = ({ email }: { email: string }) => {
  return db.user.findUnique({
    where: {
      email,
    },
  })
}

interface CreateUserArgs {
  input: Prisma.UserCreateInput
}

export const createUser = async ({ input }: CreateUserArgs) => {
  // Email validations
  const user = await db.user.findUnique({
    where: {
      email: input.email,
    },
  })

  if (user) {
    return new ValidationError('Email already exists')
  }

  // Encrypt password
  const encryptedPassword = useHashedPassword(input.hashedPassword)

  const userInput = {
    name: input.name,
    email: input.email,
    password: input.password,
    hashedPassword: encryptedPassword.hashPassword,
    salt: encryptedPassword.salt,
    user_type: input.user_type,
    phone_number: input?.phone_number,
    address: input?.address,
  }

  const userCreate = await db.user.create({
    data: userInput,
  })

  if (input.user_type !== 'admin') {
    await createCustomer({
      input: {
        user: {
          connect: {
            id: userCreate.id,
          },
        },
      },
    })
  }

  return userCreate
}

interface UpdateUserArgs extends Prisma.UserWhereUniqueInput {
  input: Prisma.UserUpdateInput
}

export const updateUser = ({ id, input }: UpdateUserArgs) => {
  const password = input?.password as string
  const encryptedPassword = password ? useHashedPassword(password) : undefined

  return db.user.update({
    data: {
      ...input,
      ...(encryptedPassword && {
        hashedPassword: encryptedPassword.hashPassword,
        salt: encryptedPassword.salt,
      }),
    },
    where: { id },
  })
}

export const deleteUser = ({ id }: Prisma.UserWhereUniqueInput) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  customer: (_obj, { root }: ResolverArgs<ReturnType<typeof user>>) =>
    db.user.findUnique({ where: { id: root.id } }).customer(),
  vehicle: (_obj, { root }: ResolverArgs<ReturnType<typeof user>>) =>
    db.user.findUnique({ where: { id: root.id } }).vehicle(),
}
