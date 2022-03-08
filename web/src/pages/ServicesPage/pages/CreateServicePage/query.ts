export const MECHANICS_QUERY = gql`
  query MechanicsQuery {
    mechanics {
      id
      is_active
      name
    }
  }
`

export const CREATESERVICE_SCHEDULES_QUERY = gql`
  query CreateServiceSchedulesQuery($input: ScheduleInput) {
    schedules(input: $input) {
      id
      status
      customer {
        user {
          name
        }
      }
      vehicle {
        name
      }
      booking_date
      status
      message
    }
  }
`
