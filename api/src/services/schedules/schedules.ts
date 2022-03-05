import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const schedules = () => {
  return db.schedule.findMany()
}

export const schedule = ({ id }: Prisma.ScheduleWhereUniqueInput) => {
  return db.schedule.findUnique({
    where: { id },
  })
}

interface CreateScheduleArgs {
  input: Prisma.ScheduleCreateInput
}

export const createSchedule = ({ input }: CreateScheduleArgs) => {
  return db.schedule.create({
    data: input,
  })
}

interface UpdateScheduleArgs extends Prisma.ScheduleWhereUniqueInput {
  input: Prisma.ScheduleUpdateInput
}

export const updateSchedule = ({ id, input }: UpdateScheduleArgs) => {
  return db.schedule.update({
    data: input,
    where: { id },
  })
}

export const deleteSchedule = ({ id }: Prisma.ScheduleWhereUniqueInput) => {
  return db.schedule.delete({
    where: { id },
  })
}

export const Schedule = {
  service: (_obj, { root }: ResolverArgs<ReturnType<typeof schedule>>) =>
    db.schedule.findUnique({ where: { id: root.id } }).service(),
}
