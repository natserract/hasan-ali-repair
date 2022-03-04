import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'
import { ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { useHashedPassword } from 'src/utils/encrypt'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }: Prisma.UserWhereUniqueInput) => {
  return db.user.findUnique({
    where: { id },
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
    hashedPassword: encryptedPassword.hashPassword,
    salt: encryptedPassword.salt,
    user_type: input.user_type,
    phone_number: input?.phone_number,
    address: input?.address,
  }

  return db.user.create({
    data: userInput,
  })
}

interface UpdateUserArgs extends Prisma.UserWhereUniqueInput {
  input: Prisma.UserUpdateInput
}

export const updateUser = ({ id, input }: UpdateUserArgs) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }: Prisma.UserWhereUniqueInput) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  Customer: (_obj, { root }: ResolverArgs<ReturnType<typeof user>>) =>
    db.user.findUnique({ where: { id: root.id } }).Customer(),
}
