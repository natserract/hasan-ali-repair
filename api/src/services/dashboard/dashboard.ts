import { db } from 'src/lib/db'
import startOfToday from 'date-fns/startOfToday'
import endOfToday from 'date-fns/endOfToday'
import startOfWeek from 'date-fns/startOfWeek'
import lastDayOfWeek from 'date-fns/lastDayOfWeek'

const initialState = {
  totalPendingBookings: 0,
  totalPartsIn: 0,
  totalNewRegisteredUsers: 0,
  totalServicesToday: 0,
  totalApprovedBookings: 0,
  totalAllVehicles: 0,
  serviceMonthly: [],
  serviceDaily: [],
}

export const dashboardReports = async ({ email }) => {
  if (!email) return initialState

  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      user_type: true,
    },
  })
  const isNonAdmin = user.user_type !== 'admin'

  const customer = await db.customer.findUnique({
    where: {
      user_id: user?.id,
    },
  })
  const schedule = await db.schedule.findFirst({
    where: {
      customer_id: {
        equals: customer?.id,
      },
    },
  })

  const totalPendingBookings = await db.schedule.findMany({
    where: {
      status: {
        equals: 'pending',
      },

      ...(isNonAdmin &&
        customer && {
          customer_id: {
            equals: customer.id,
          },
        }),
    },
  })

  const userVehicles = await db.vehicle.findMany({
    where: {
      user_id: {
        equals: user?.id,
      },
    },
  })

  const totalApprovedBookings = await db.schedule.findMany({
    where: {
      status: {
        equals: 'approved',
      },

      ...(isNonAdmin &&
        customer && {
          customer_id: {
            equals: customer.id,
          },
        }),
    },
  })

  // Based on week
  const totalPartsIn = await db.part.findMany({
    where: {
      in_date: {
        gte: startOfWeek(startOfToday(), { weekStartsOn: 1 }),
        lte: lastDayOfWeek(endOfToday()),
      },
    },
  })

  // Based on week
  const totalNewRegisteredUsers = await db.user.findMany({
    where: {
      created_at: {
        gte: startOfWeek(startOfToday(), { weekStartsOn: 1 }),
        lte: lastDayOfWeek(endOfToday()),
      },
    },
  })

  // Based on today
  const totalServicesToday = await db.service.findMany({
    where: {
      created_at: {
        gte: startOfToday(),
        lte: endOfToday(),
      },
    },
  })

  // Based on months
  const allServiceMonthly = await db.$queryRaw`
    SELECT DATE_FORMAT(created_at,'%m') as month, sum(price) as price,
    COUNT(*) as count from services
    GROUP BY month;
  `
  const userServiceMonthly = await db.$queryRaw`
    SELECT DATE_FORMAT(created_at,'%m') as month, sum(price) as price,
    COUNT(*) as count from services
    WHERE schedule_id = ${schedule.id || 0}
    GROUP BY month;
  `

  const allServiceDaily = await db.$queryRaw`
    SELECT DATE_FORMAT(created_at,'%d') as day, sum(price) as price,
    COUNT(*) as count from services
    GROUP BY day;
  `
  const userServiceDaily = await db.$queryRaw`
    SELECT DATE_FORMAT(created_at,'%d') as day, sum(price) as price,
    COUNT(*) as count from services
    WHERE schedule_id = ${schedule.id || 0}
    GROUP BY day;
  `

  return {
    totalPendingBookings: totalPendingBookings.length,
    totalPartsIn: totalPartsIn.length,
    totalNewRegisteredUsers: totalNewRegisteredUsers.length,
    totalServicesToday: totalServicesToday.length,
    totalApprovedBookings: totalApprovedBookings.length,
    totalAllVehicles: userVehicles.length,
    serviceMonthly: isNonAdmin ? userServiceMonthly : allServiceMonthly,
    serviceDaily: isNonAdmin ? userServiceDaily : allServiceDaily,
  }
}
