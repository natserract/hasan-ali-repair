import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { InputList } from 'src/types/share'

type PartUsedsArgs = InputList

export const partUseds = ({ input }: PartUsedsArgs) => {
  const $where = (input?.filter && JSON.parse(input?.filter)) || undefined

  return db.partUsed.findMany({
    where: {
      ...($where && {
        ...$where,
      }),
    },
  })
}

export const partUsed = ({ id }: Prisma.PartUsedWhereUniqueInput) => {
  return db.partUsed.findUnique({
    where: { id },
  })
}

interface CreatePartUsedArgs {
  input: Prisma.PartUsedCreateInput
}

export const createPartUsed = ({ input }: CreatePartUsedArgs) => {
  return db.partUsed.create({
    data: input,
  })
}

interface UpdatePartUsedArgs extends Prisma.PartUsedWhereUniqueInput {
  input: Prisma.PartUsedUpdateInput
}

export const updatePartUsed = ({ id, input }: UpdatePartUsedArgs) => {
  return db.partUsed.update({
    data: input,
    where: { id },
  })
}

export const deletePartUsed = ({ id }: Prisma.PartUsedWhereUniqueInput) => {
  return db.partUsed.delete({
    where: { id },
  })
}

export const PartUsed = {
  parts: (_obj, { root }: ResolverArgs<ReturnType<typeof partUsed>>) =>
    db.partUsed.findUnique({ where: { id: root.id } }).parts(),
  mechanic: (_obj, { root }: ResolverArgs<ReturnType<typeof partUsed>>) =>
    db.partUsed.findUnique({ where: { id: root.id } }).mechanic(),
  service: (_obj, { root }: ResolverArgs<ReturnType<typeof partUsed>>) =>
    db.partUsed.findUnique({ where: { id: root.id } }).service(),
}
