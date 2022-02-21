import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const mechanics = () => {
  return db.mechanic.findMany()
}

export const mechanic = ({ id }: Prisma.MechanicWhereUniqueInput) => {
  return db.mechanic.findUnique({
    where: { id },
  })
}

interface CreateMechanicArgs {
  input: Prisma.MechanicCreateInput
}

export const createMechanic = ({ input }: CreateMechanicArgs) => {
  return db.mechanic.create({
    data: input,
  })
}

interface UpdateMechanicArgs extends Prisma.MechanicWhereUniqueInput {
  input: Prisma.MechanicUpdateInput
}

export const updateMechanic = ({ id, input }: UpdateMechanicArgs) => {
  return db.mechanic.update({
    data: input,
    where: { id },
  })
}

export const deleteMechanic = ({ id }: Prisma.MechanicWhereUniqueInput) => {
  return db.mechanic.delete({
    where: { id },
  })
}

export const Mechanic = {
  Service: (_obj, { root }: ResolverArgs<ReturnType<typeof mechanic>>) =>
    db.mechanic.findUnique({ where: { id: root.id } }).Service(),
  PartsUsed: (_obj, { root }: ResolverArgs<ReturnType<typeof mechanic>>) =>
    db.mechanic.findUnique({ where: { id: root.id } }).PartsUsed(),
}
