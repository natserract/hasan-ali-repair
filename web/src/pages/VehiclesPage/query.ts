export const VEHICLESPAGE_VEHICLES_QUERY = gql`
  query VehiclesPageVehiclesQuery {
    vehicles {
      id
      name
      serialNum
      year
      details
    }
  }
`
