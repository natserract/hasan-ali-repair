import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const customers = () => {
  return db.customer.findMany()
}

export const customer = ({ id }: Prisma.CustomerWhereUniqueInput) => {
  return db.customer.findUnique({
    where: { id },
  })
}

interface CreateCustomerArgs {
  input: Prisma.CustomerCreateInput
}

export const createCustomer = ({ input }: CreateCustomerArgs) => {
  return db.customer.create({
    data: input,
  })
}

interface UpdateCustomerArgs extends Prisma.CustomerWhereUniqueInput {
  input: Prisma.CustomerUpdateInput
}

export const updateCustomer = ({ id, input }: UpdateCustomerArgs) => {
  return db.customer.update({
    data: input,
    where: { id },
  })
}

export const deleteCustomer = ({ id }: Prisma.CustomerWhereUniqueInput) => {
  return db.customer.delete({
    where: { id },
  })
}

export const Customer = {
  user: (_obj, { root }: ResolverArgs<ReturnType<typeof customer>>) =>
    db.customer.findUnique({ where: { id: root.id } }).user(),
  service: (_obj, { root }: ResolverArgs<ReturnType<typeof customer>>) =>
    db.customer.findUnique({ where: { id: root.id } }).service(),
}
