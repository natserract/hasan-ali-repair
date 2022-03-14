import { db } from 'src/lib/db'
import startOfToday from 'date-fns/startOfToday'
import endOfToday from 'date-fns/endOfToday'
import startOfWeek from 'date-fns/startOfWeek'
import lastDayOfWeek from 'date-fns/lastDayOfWeek'

export const dashboardReports = async () => {
  const totalPendingBookings = await db.schedule.findMany({
    where: {
      status: {
        equals: 'pending',
      },
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
  const servicesOnMonth = await db.$queryRaw`
    SELECT DATE_FORMAT(created_at,'%m') as month, sum(price) as price,
    COUNT(*) as count from services
    GROUP BY month;
  `

  console.log('servicesOnMonth', servicesOnMonth)

  return {
    totalPendingBookings: totalPendingBookings.length,
    totalPartsIn: totalPartsIn.length,
    totalNewRegisteredUsers: totalNewRegisteredUsers.length,
    totalServicesToday: totalServicesToday.length,
  }
}