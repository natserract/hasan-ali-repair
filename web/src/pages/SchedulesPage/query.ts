export const SCHEDULES_QUERY = gql`
  query SchedulesQuery($input: ScheduleInput) {
    schedules(input: $input) {
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
