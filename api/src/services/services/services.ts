import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const services = () => {
  return db.service.findMany()
}

export const service = ({ id }: Prisma.ServiceWhereUniqueInput) => {
  return db.service.findUnique({
    where: { id },
  })
}

interface CreateServiceArgs {
  input: Prisma.ServiceCreateInput
}

export const createService = ({ input }: CreateServiceArgs) => {
  return db.service.create({
    data: input,
  })
}

interface UpdateServiceArgs extends Prisma.ServiceWhereUniqueInput {
  input: Prisma.ServiceUpdateInput
}

export const updateService = ({ id, input }: UpdateServiceArgs) => {
  return db.service.update({
    data: input,
    where: { id },
  })
}

export const deleteService = ({ id }: Prisma.ServiceWhereUniqueInput) => {
  return db.service.delete({
    where: { id },
  })
}

export const Service = {
  vehicle: (_obj, { root }: ResolverArgs<ReturnType<typeof service>>) =>
    db.service.findUnique({ where: { id: root.id } }).vehicle(),
  mechanic: (_obj, { root }: ResolverArgs<ReturnType<typeof service>>) =>
    db.service.findUnique({ where: { id: root.id } }).mechanic(),
  customer: (_obj, { root }: ResolverArgs<ReturnType<typeof service>>) =>
    db.service.findUnique({ where: { id: root.id } }).customer(),
  partsUsed: (_obj, { root }: ResolverArgs<ReturnType<typeof service>>) =>
    db.service.findUnique({ where: { id: root.id } }).partsUsed(),
  schedule: (_obj, { root }: ResolverArgs<ReturnType<typeof service>>) =>
    db.service.findUnique({ where: { id: root.id } }).schedule(),
}
