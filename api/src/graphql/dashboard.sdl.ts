export const schema = gql`
  type ServiceMonthly {
    month: String!
    price: Int!
    count: Int!
  }

  type ServiceDaily {
    day: String!
    price: Int!
    count: Int!
  }

  type DashboardReports {
    totalPendingBookings: Int
    totalPartsIn: Int
    totalNewRegisteredUsers: Int
    totalServicesToday: Int
    serviceMonthly: [ServiceMonthly!]!
    serviceDaily: [ServiceDaily!]!
  }

  type Query {
    dashboardReports: DashboardReports! @skipAuth
  }
`
