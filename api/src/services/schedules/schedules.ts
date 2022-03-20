import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'
import { ITEMS_PER_PAGE } from 'src/constants/config'

import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/mail'

import { InputList } from 'src/types/share'
import startOfToday from 'date-fns/startOfToday'
import endOfToday from 'date-fns/endOfToday'
import { MAXIMUM_BOOK_DAY } from 'src/constants/config'
import { parseDate } from 'src/utils/date'
import { mailTemplate } from 'src/templates/common/mail-template'
import { mechanic } from '../mechanics/mechanics'
import { toRupiah } from 'src/utils/currency'

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
  // TODO:
  // Is user only can create schedule max 1
  // in current date?
  return db.schedule.create({
    data: input,
  })
}

interface UpdateScheduleArgs extends Prisma.ScheduleWhereUniqueInput {
  input: Prisma.ScheduleUpdateInput
}

export const updateSchedule = async ({ id, input }: UpdateScheduleArgs) => {
  const schedule = await db.schedule.update({
    data: input,
    where: { id },
  })
  const { status } = schedule

  async function completedSchedule() {
    const service = await db.service.findFirst({
      where: {
        schedule_id: id,
      },
    })

    const mechanicServe = await mechanic({
      id: service.mechanic_id,
    })
    const partsUsed = await db.partUsed.findMany({
      where: {
        service_id: service.id,
      },
      select: {
        part_id: true,
      },
    })

    const parts = await Promise.all(
      partsUsed.map(async (v) => {
        const response = await db.part.findUnique({
          where: {
            id: v.part_id,
          },
        })

        return response
      })
    )

    return {
      service,
      parts,
      mechanicServe,
    }
  }

  async function sendUserEmail() {
    const customer = await db.customer.findUnique({
      where: {
        id: schedule.customer_id,
      },
    })
    const user = await db.user.findFirst({
      where: {
        id: customer.user_id,
      },
    })

    const date = parseDate(schedule.booking_date)

    const mailContent = {
      approved: `
        <p>
          Your scheduled at ${date} has been <b>${status}</b>. Please go to Bengkel Hasan Ali office to vehicle check, in accordance with your schedule date.
        </p>
      `,
      unapproved: `
        <p>
          Sorry, your scheduled at ${date} has been <b>${status}</b>. Please book/find another date.
        </p>
      `,
      on_review: `
        <p>
          Your scheduled at ${date} has been updated to <b>${status}</b>. Please go to Bengkel Hasan Ali office to see all's details (e.g. price) <i> (max 3 days start from your scheduled date)</i>.
        </p>
      `,
      on_progress: `
        <p>
          Your scheduled at ${date} has been updated to <b>${status}</b>. Please wait for several days and we confirm you if service completed.
        </p>
      `,
    }

    let mailSendTemplate = ''

    switch (status) {
      case 'approved': {
        mailSendTemplate = mailContent.approved
        break
      }
      case 'unapproved':
      case 'cancelled': {
        mailSendTemplate = mailContent.unapproved
        break
      }
      case 'on review': {
        mailSendTemplate = mailContent.on_review
        break
      }
      case 'on progress': {
        mailSendTemplate = mailContent.on_progress
        break
      }
      case 'complete': {
        const { service, parts, mechanicServe } = await completedSchedule()

        mailSendTemplate = `
          <p>Hore.., your scheduled at ${date} has been <b>${
          schedule.status
        }</b>. Please go to Bengkel Hasan Ali office to take your vehicle. Thanks for orders!

            <h4 style="margin: 30px 0 20px;">Message</h4>
            <p>${schedule.message}</p>

            <h4 style="margin: 30px 0 20px;">Mechanic</h4>
            <p>${mechanicServe.name}</p>

            <h4 style="margin: 30px 0 20px;">Parts Useds</h4>
            <ul>
            ${String(
              parts.map((value) => {
                return `
                <li>${value.name}: <b>${toRupiah(
                  value.price as unknown as number
                ).replaceAll(/,/g, '.')}</b></li>
                `
              })
            )
              .replaceAll(/,/g, '')
              .trim()}
            </ul>

            <h4 style="margin: 30px 0 20px;">Total Price</h4>
            <p>${toRupiah(service.price as unknown as number)}</p>
        </p>
        `
        break
      }
      default: {
        mailSendTemplate = `
          <p>
          Your scheduled at ${date} has been updated to <b>${status}</b>.
        </p>
        `
      }
    }

    await sendEmail({
      to: user.email,
      subject: 'Bengkel Hasan Ali Status Report',
      html: mailTemplate(user.name, mailSendTemplate),
    })
  }

  // Start from > pending
  // If status complete, send email from services
  const isNotPending = status !== 'pending'
  if (isNotPending) {
    await sendUserEmail()
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
        // notIn: ['pending', 'complete', 'cancelled'],
        equals: 'pending',
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
