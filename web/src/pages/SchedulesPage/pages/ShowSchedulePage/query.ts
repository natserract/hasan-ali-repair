export const SHOWSCHEDULE_QUERY = gql`
  query ShowScheduleQuery($id: Int!) {
    schedule(id: $id) {
      booking_date
      message

      # Status
      status

      # Vehicle Name
      vehicle {
        name
        serialNum
      }

      # User
      customer {
        user {
          name
        }
      }
    }
  }
`
