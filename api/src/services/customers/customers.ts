import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'
import { ITEMS_PER_PAGE } from 'src/constants/config'

import { db } from 'src/lib/db'

import { InputList } from 'src/types/share'

type CustomersArgs = InputList

export const customers = ({ input }: CustomersArgs) => {
  const _orderBy = (input?.sort && JSON.parse(input?.sort)) || undefined
  const $where = (input?.filter && JSON.parse(input?.filter)) || undefined

  return db.customer.findMany({
    take: input?.limit || ITEMS_PER_PAGE,
    skip: input?.start || 0,
    where: {
      ...($where && {
        ...$where,
      }),
    },
  })
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
  schedule: (_obj, { root }: ResolverArgs<ReturnType<typeof customer>>) =>
    db.customer.findUnique({ where: { id: root.id } }).schedule(),
}
