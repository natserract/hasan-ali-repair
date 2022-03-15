import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'
import { ITEMS_PER_PAGE } from 'src/constants/config'

import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/mail'

import { InputList } from 'src/types/share'
import startOfToday from 'date-fns/startOfToday'
import endOfToday from 'date-fns/endOfToday'
import { MAXIMUM_BOOK_DAY } from 'src/config/business'

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
  input: Prisma.ScheduleUpdateInput & {
    send_email?: boolean
  }
}

export const updateSchedule = async ({
  id,
  input: { send_email, ...input },
}: UpdateScheduleArgs) => {
  const schedule = db.schedule.update({
    data: input,
    where: { id },
  })

  if (send_email) {
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

  return schedule
}

export const deleteSchedule = ({ id }: Prisma.ScheduleWhereUniqueInput) => {
  return db.schedule.delete({
    where: { id },
  })
}

// Service for current active schedule today
// @client can see this activity
export const currentSessions = async () => {
  const schedules = await db.schedule.findMany({
    where: {
      booking_date: {
        gte: startOfToday(),
        lte: endOfToday(),
      },
      status: {
        // on progress mean, schedule has been approved by admin and client
        // and on progress to repair
        equals: 'on progress',
      },
    },
  })
  const isMaximum = schedules.length === MAXIMUM_BOOK_DAY

  return {
    schedules,
    isMaximum,
  }
}

export const Schedule = {
  customer: (_obj, { root }: ResolverArgs<ReturnType<typeof schedule>>) =>
    db.schedule.findUnique({ where: { id: root.id } }).customer(),
  vehicle: (_obj, { root }: ResolverArgs<ReturnType<typeof schedule>>) =>
    db.schedule.findUnique({ where: { id: root.id } }).vehicle(),
  service: (_obj, { root }: ResolverArgs<ReturnType<typeof schedule>>) =>
    db.schedule.findUnique({ where: { id: root.id } }).service(),
}
