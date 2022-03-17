import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'
import { ITEMS_PER_PAGE } from 'src/constants/config'

import { db } from 'src/lib/db'

import { InputList } from 'src/types/share'
import { currentSessions } from '../schedules/schedules'
import { parseDate } from 'src/utils/date'

type VehiclesInput = InputList

export const vehicles = async ({ input }: VehiclesInput) => {
  const orderBy = (input?.sort && JSON.parse(input?.sort)) || undefined
  const $where = (input?.filter && JSON.parse(input?.filter)) || undefined

  const vehicles = await db.vehicle.findMany({
    take: input?.limit || ITEMS_PER_PAGE,
    skip: input?.start || 0,
    orderBy: {
      ...(orderBy || {
        created_at: 'desc',
      }),
    },
    where: {
      ...($where && {
        ...$where,
      }),
    },
  })

  return vehicles
}

type VehicleScheduledInput = {
  input: {
    start_date: Date
    user_id: number
  }
}
export const vehiclesScheduled = async ({ input }: VehicleScheduledInput) => {
  const vehicles = await db.vehicle.findMany({
    where: {
      user_id: {
        equals: input?.user_id,
      },
    },
  })

  const date = new Date(
    `${input?.start_date.getFullYear()}-${input?.start_date.getMonth()}-${input?.start_date.getDate()}`
  )

  const startDate = input?.start_date
    ? parseDate(input?.start_date, 'yyyy-MM-dd') + `T00:00:00.000Z`
    : undefined
  const endDate = input?.start_date
    ? parseDate(input?.start_date, 'yyyy-MM-dd') + `T23:59:59.999Z`
    : undefined
  console.log('DATE', startDate, endDate)

  const schedules = await db.schedule.findMany({
    where: {
      booking_date: {
        gte: startDate,
        lte: endDate,
      },
    },
  })

  const vehiclesScheduled = vehicles.filter((v) => {
    return schedules.some((schedule) => schedule.vehicle_id !== v.id)
  })

  const results =
    schedules.length && vehiclesScheduled.length ? vehiclesScheduled : vehicles
  return results
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
