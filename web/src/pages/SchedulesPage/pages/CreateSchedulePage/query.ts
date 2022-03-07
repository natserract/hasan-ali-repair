export const VEHICLES_QUERY = gql`
  query VehiclesQuery($input: VehiclesInput) {
    vehicles(input: $input) {
      id
      name
      serialNum
    }
  }
`
