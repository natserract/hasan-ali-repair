export const EDITSCHEDULE_SHOWSCHEDULE_QUERY = gql`
  query ShowScheduleQuery($id: Int!) {
    schedule(id: $id) {
      booking_date
      message

      # Status
      status

      # Vehicle Name
      vehicle {
        id
        name
        serialNum
      }

      # User
      customer {
        id
        user {
          id
          name
        }
      }
    }
  }
`

export const EDITSCHEDULECUSTOMERS_QUERY = gql`
  query CustomersQuery($input: CustomersInput) {
    customers(input: $input) {
      id
      user_id
      user {
        name
      }
    }
  }
`

export const EDITSCHEDULEVEHICLES_QUERY = gql`
  query VehiclesQuery($input: VehiclesInput) {
    vehicles(input: $input) {
      id
      name
      serialNum
    }
  }
`
