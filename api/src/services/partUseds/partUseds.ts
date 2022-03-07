import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { part } from '../parts/parts'
import { updateService } from '../services/services'

export const partUseds = () => {
  return db.partUsed.findMany()
}

export const partUsed = ({ id }: Prisma.PartUsedWhereUniqueInput) => {
  return db.partUsed.findUnique({
    where: { id },
  })
}

interface CreatePartUsedArgs {
  input: Prisma.PartUsedUncheckedCreateInput
}

export const createPartUsed = async ({ input }: CreatePartUsedArgs) => {
  const partsUsed = db.partUsed.create({
    data: {
      ...input,
    },
  })

  async function updatePriceOnService() {
    const getPart = await part({
      id: input.part_id,
    })

    await updateService({
      id: input.service_id,
      input: {
        price: getPart.price.toNumber() * input.used_qty,
      },
    })
  }

  await updatePriceOnService()

  return partsUsed
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
