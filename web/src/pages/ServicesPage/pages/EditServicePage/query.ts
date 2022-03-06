export const SERVICEQUERY = gql`
  query ServiceQuery($id: Int!) {
    service(id: $id) {
      customer {
        id
        user {
          id
          name
        }
      }
      vehicle_id
      mechanic_id
      mechanic {
        id
        name
      }
      status
      price
      message
    }
  }
`

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
