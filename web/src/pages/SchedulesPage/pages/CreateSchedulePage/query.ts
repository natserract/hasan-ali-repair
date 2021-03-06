export const VEHICLES_QUERY = gql`
  query VehiclesQuery($input: VehiclesInput) {
    vehicles(input: $input) {
      id
      name
      serialNum

      schedule {
        vehicle_id
        booking_date
      }
    }
  }
`

export const CUSTOMERS_QUERY = gql`
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

export const CUSTOMER_QUERY = gql`
  query CustomerQuery($id: Int!) {
    customer(id: $id) {
      id
      user_id
      user {
        name
      }
    }
  }
`

export const SCHEDULE_CURRENTSESSION = gql`
  query ScheduleCurrentSession {
    currentSessions {
      schedules {
        booking_date
        status
      }
      isMaximum
    }
  }
`
