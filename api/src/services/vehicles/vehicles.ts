import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const vehicles = () => {
  return db.vehicle.findMany()
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
  Service: (_obj, { root }: ResolverArgs<ReturnType<typeof vehicle>>) =>
    db.vehicle.findUnique({ where: { id: root.id } }).Service(),
}
