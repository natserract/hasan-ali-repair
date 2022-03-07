export const SCHEDULES_QUERY = gql`
  query SchedulesQuery {
    schedules {
      id
      status
      booking_date
      customer {
        user {
          name
        }
      }
    }
  }
`
