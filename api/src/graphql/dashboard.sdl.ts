export const schema = gql`
  type DashboardReports {
    totalPendingBookings: Int
    totalPartsIn: Int
    totalNewRegisteredUsers: Int
    totalServicesToday: Int
  }

  type Query {
    dashboardReports: DashboardReports! @skipAuth
  }
`
