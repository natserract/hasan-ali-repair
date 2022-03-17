import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'
import { ITEMS_PER_PAGE } from 'src/constants/config'

import { db } from 'src/lib/db'

import { InputList } from 'src/types/share'
import { createPartUsed, deletePartUsed } from '../partUseds/partUseds'
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
  input: Prisma.ServiceUncheckedCreateInput & {
    part_ids?: number[]
  }
}

export const createService = async ({ input }: CreateServiceArgs) => {
  const isHasPartUsed = input?.part_ids && Array.from(input?.part_ids).length

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
      created_by: input.created_by,
    },
  })

  // Create part used,
  const partsUsedIds = [] as number[]

  if (isHasPartUsed) {
    const partIds = Array.from(input?.part_ids)
    const createPartsUsed = partIds.map(async (item) => {
      const responses = await createPartUsed({
        input: {
          mechanic: {
            connect: {
              id: service.mechanic_id,
            },
          },
          parts: {
            connect: {
              id: item,
            },
          },
          service: {
            connect: {
              id: service.id,
            },
          },
        },
      })

      partsUsedIds.push(responses.part_id)
      return responses
    })

    await Promise.all(createPartsUsed)
  }

  // Every service create, set to >= `on progress`
  await updateSchedule({
    id: service.schedule_id,
    input: {
      status: 'on review',
    },
  })

  return service
}

interface UpdateServiceArgs extends Prisma.ServiceWhereUniqueInput {
  input: Prisma.ServiceUpdateInput & {
    part_ids?: number[]
  }
}

export const updateService = async ({
  id,
  input: { part_ids, ...input },
}: UpdateServiceArgs) => {
  console.log('update service input', input, part_ids)

  const sessionId = context?.currentUser?.id
  const isHasPartUsed = part_ids && Array.from(part_ids).length

  const service = await db.service.update({
    data: {
      ...input,
      updated_by: input?.updated_by ?? sessionId,
    },
    where: { id },
  })

  if (isHasPartUsed) {
    const partIds = Array.from(part_ids)
    const partUsedsDb = await db.partUsed.findMany({
      where: {
        service_id: service.id,
      },
      select: {
        id: true,
        part_id: true,
      },
    })

    const removedPartUsed = partUsedsDb.filter(
      (v) => !partIds.includes(v.part_id)
    )
    if (removedPartUsed.length) {
      await Promise.all(
        removedPartUsed.map(async (part) => {
          await deletePartUsed({
            id: part.id,
          })
        })
      )
    }

    const newPartUsed = partIds.filter((p) => {
      const items = partUsedsDb.map((v) => v.part_id)

      return !items.includes(p)
    })
    await Promise.all(
      newPartUsed.map(async (part) => {
        await createPartUsed({
          input: {
            mechanic: {
              connect: {
                id: service.mechanic_id,
              },
            },
            parts: {
              connect: {
                id: part,
              },
            },
            service: {
              connect: {
                id: service.id,
              },
            },
          },
        })
      })
    )
  }

  return service
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
