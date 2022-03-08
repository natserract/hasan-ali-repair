import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'
import { ITEMS_PER_PAGE } from 'src/constants/config'

import { db } from 'src/lib/db'

import { InputList } from 'src/types/share'

type VehiclesInput = InputList

export const vehicles = ({ input }: VehiclesInput) => {
  const orderBy = (input?.sort && JSON.parse(input?.sort)) || undefined
  const $where = (input?.filter && JSON.parse(input?.filter)) || undefined

  return db.vehicle.findMany({
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

export const vehicle = ({ id }: Prisma.VehicleWhereUniqueInput) => {
  return db.vehicle.findUnique({
    where: { id },
  })
}

interface CreateVehicleArgs {
  input: Prisma.VehicleCreateInput
}

export const createVehicle = ({ input }: CreateVehicleArgs) => {
  return db.vehicle.create({
    data: input,
  })
}

interface UpdateVehicleArgs extends Prisma.VehicleWhereUniqueInput {
  input: Prisma.VehicleUpdateInput
}

export const updateVehicle = ({ id, input }: UpdateVehicleArgs) => {
  return db.vehicle.update({
    data: input,
    where: { id },
  })
}

export const deleteVehicle = ({ id }: Prisma.VehicleWhereUniqueInput) => {
  return db.vehicle.delete({
    where: { id },
  })
}

export const Vehicle = {
  user: (_obj, { root }: ResolverArgs<ReturnType<typeof vehicle>>) =>
    db.vehicle.findUnique({ where: { id: root.id } }).user(),
  schedule: (_obj, { root }: ResolverArgs<ReturnType<typeof vehicle>>) =>
    db.vehicle.findUnique({ where: { id: root.id } }).schedule(),
}
