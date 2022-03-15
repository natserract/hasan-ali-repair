export const SCHEDULES_QUERY = gql`
  query SchedulesQuery($input: ScheduleInput) {
    schedules(input: $input) {
      id
      status
      booking_date
      customer {
        user {
          email
          name
        }
      }
    }
  }
`

export const SCHEDULES_CURRENTSESSION_QUERY = gql`
  query SchedulesCurrentSession {
    currentSessions {
      isMaximum
    }
  }
`
