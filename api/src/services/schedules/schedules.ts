import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'
import { ITEMS_PER_PAGE } from 'src/constants/config'

import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/mail'

import { InputList } from 'src/types/share'

type ScheduleArgs = InputList

export const schedules = ({ input }: ScheduleArgs) => {
  const orderBy = (input?.sort && JSON.parse(input?.sort)) || undefined
  const $where = (input?.filter && JSON.parse(input?.filter)) || undefined

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return db.schedule.findMany({
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

export const updateSchedule = async ({ id, input }: UpdateScheduleArgs) => {
  if (input?.status === 'approved' || input?.status === 'unapproved') {
    await sendEmail({
      to: 'benjaminstwo@gmail.com',
      subject: 'Test Email',
      text:
        'This is a manually triggered test email.\n\n' +
        'It was sent from a RedwoodJS application.',
      html:
        'This is a manually triggered test email.<br><br>' +
        'It was sent from a RedwoodJS application.',
    })
  }

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
  customer: (_obj, { root }: ResolverArgs<ReturnType<typeof schedule>>) =>
    db.schedule.findUnique({ where: { id: root.id } }).customer(),
  vehicle: (_obj, { root }: ResolverArgs<ReturnType<typeof schedule>>) =>
    db.schedule.findUnique({ where: { id: root.id } }).vehicle(),
  service: (_obj, { root }: ResolverArgs<ReturnType<typeof schedule>>) =>
    db.schedule.findUnique({ where: { id: root.id } }).service(),
}
