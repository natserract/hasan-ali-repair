export const DASHBOARDREPORTS_QUERY = gql`
  query DashboardReportsQuery {
    dashboardReports {
      totalPendingBookings
      totalPartsIn
      totalNewRegisteredUsers
      totalServicesToday

      serviceDaily {
        day
        price
        count
      }
    }
  }
`
