export const VEHICLESPAGE_VEHICLES_QUERY = gql`
  query VehiclesPageVehiclesQuery($input: VehiclesInput) {
    vehicles(input: $input) {
      id
      name
      serialNum
      year
      details
    }
  }
`
