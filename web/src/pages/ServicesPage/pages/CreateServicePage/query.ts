export const VEHICLES_QUERY = gql`
  query VehiclesQuery($input: VehiclesInput) {
    vehicles(input: $input) {
      id
      name
      serialNum
    }
  }
`

export const MECHANICS_QUERY = gql`
  query MechanicsQuery {
    mechanics {
      id
      is_active
      name
    }
  }
`

export const CUSTOMERS_QUERY = gql`
  query CustomersQuery {
    customers {
      id
      user_id
      user {
        name
      }
    }
  }
`
