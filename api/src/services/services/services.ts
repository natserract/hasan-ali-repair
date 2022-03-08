import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'
import { ITEMS_PER_PAGE } from 'src/constants/config'

import { db } from 'src/lib/db'

import { InputList } from 'src/types/share'
import { updateSchedule } from '../schedules/schedules'

type ServicesArgs = InputList

export const services = ({ input }: ServicesArgs) => {
  const orderBy = (input?.sort && JSON.parse(input?.sort)) || undefined
  const $where = (input?.filter && JSON.parse(input?.filter)) || undefined

  return db.service.findMany({
    take: input?.limit || ITEMS_PER_PAGE,
    skip: input?.start || 0,
    orderBy: {
      ...(orderBy || {
        created_at: 'asc',
      }),
    },
    where: {
      ...($where && {
        ...$where,
      }),
    },
  })
}

export const service = ({ id }: Prisma.ServiceWhereUniqueInput) => {
  return db.service.findUnique({
    where: { id },
  })
}

interface CreateServiceArgs {
  input: Prisma.ServiceUncheckedCreateInput
}

export const createService = async ({ input }: CreateServiceArgs) => {
  const sessionId = context?.currentUser?.id

  const service = await db.service.create({
    data: {
      mechanic: {
        connect: {
          id: input.mechanic_id,
        },
      },
      schedule: {
        connect: {
          id: input.schedule_id,
        },
      },
      price: input?.price,
      created_by: sessionId,
    },
  })

  // Every service create, set to >= `on progress`
  await updateSchedule({
    id: service.schedule_id,
    input: {
      status: 'on progress',
    },
  })

  return service
}

interface UpdateServiceArgs extends Prisma.ServiceWhereUniqueInput {
  input: Prisma.ServiceUpdateInput
}

export const updateService = ({ id, input }: UpdateServiceArgs) => {
  const sessionId = context?.currentUser?.id

  return db.service.update({
    data: {
      ...input,
      updated_by: input?.updated_by ?? sessionId,
    },
    where: { id },
  })
}

export const deleteService = ({ id }: Prisma.ServiceWhereUniqueInput) => {
  return db.service.delete({
    where: { id },
  })
}

export const Service = {
  mechanic: (_obj, { root }: ResolverArgs<ReturnType<typeof service>>) =>
    db.service.findUnique({ where: { id: root.id } }).mechanic(),
  schedule: (_obj, { root }: ResolverArgs<ReturnType<typeof service>>) =>
    db.service.findUnique({ where: { id: root.id } }).schedule(),
  partsUsed: (_obj, { root }: ResolverArgs<ReturnType<typeof service>>) =>
    db.service.findUnique({ where: { id: root.id } }).partsUsed(),
}
