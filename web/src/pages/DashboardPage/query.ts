export const DASHBOARDREPORTS_QUERY = gql`
  query DashboardReportsQuery($email: String) {
    dashboardReports(email: $email) {
      totalPendingBookings
      totalPartsIn
      totalNewRegisteredUsers
      totalServicesToday

      totalApprovedBookings
      totalAllVehicles

      serviceDaily {
        day
        price
        count
      }
    }
  }
`
