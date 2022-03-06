export const SCHEDULES_QUERY = gql`
  query SchedulesQuery {
    schedules {
      id
      time_from
      time_to
      service {
        status
        customer {
          user {
            name
          }
        }
      }
    }
  }
`
