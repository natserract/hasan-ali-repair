export const EDITVEHICLE_SHOWVEHICLEQUERY = gql`
  query EditVehicleShowVehicleQuery($id: Int!) {
    vehicle(id: $id) {
      id
      name
      serialNum
      details
      year
    }
  }
`
