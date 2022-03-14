export const SHOWVEHICLEQUERY = gql`
  query ShowVehicleQuery($id: Int!) {
    vehicle(id: $id) {
      id
      name
      serialNum
      created_at
      details
      year
    }
  }
`
