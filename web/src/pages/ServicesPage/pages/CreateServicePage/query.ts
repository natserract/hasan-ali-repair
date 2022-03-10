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
          email
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

export const CREATESERVICE_PARTSQUERY = gql`
  query CreateServicePartsQuery {
    parts {
      id
      name
      part_number
      qty
      price
    }
  }
`
