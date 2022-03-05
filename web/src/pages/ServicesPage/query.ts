export const SERVICESPAGE_SERVICES_QUERY = gql`
  query ServicesPageServicesQuery {
    services {
      id
      customer {
        user {
          name
        }
      }
      schedule {
        time_from
        time_to
      }
      mechanic {
        name
      }
      vehicle {
        name
        serialNum
      }
      status
      partsUsed {
        parts {
          name
        }
      }
    }
  }
`
