import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const parts = () => {
  return db.part.findMany()
}

export const part = ({ id }: Prisma.PartWhereUniqueInput) => {
  return db.part.findUnique({
    where: { id },
  })
}

interface CreatePartArgs {
  input: Prisma.PartCreateInput
}

export const createPart = ({ input }: CreatePartArgs) => {
  return db.part.create({
    data: input,
  })
}

interface UpdatePartArgs extends Prisma.PartWhereUniqueInput {
  input: Prisma.PartUpdateInput
}

export const updatePart = ({ id, input }: UpdatePartArgs) => {
  return db.part.update({
    data: input,
    where: { id },
  })
}

export const deletePart = ({ id }: Prisma.PartWhereUniqueInput) => {
  return db.part.delete({
    where: { id },
  })
}

export const Part = {
  partsUsed: (_obj, { root }: ResolverArgs<ReturnType<typeof part>>) =>
    db.part.findUnique({ where: { id: root.id } }).partsUsed(),
}
