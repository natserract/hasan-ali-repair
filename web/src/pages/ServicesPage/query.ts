export const SERVICESPAGE_SERVICES_QUERY = gql`
  query ServicesPageServicesQuery {
    services {
      id
      customer {
        user {
          name
        }
      }
      vehicle {
        name
        serialNum
      }
      status
    }
  }
`
