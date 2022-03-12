export const VEHICLESPAGE_DELETEVEHICLEMUTATION = gql`
  mutation VehiclesDeleteVehicleMutation($id: Int!) {
    deleteVehicle(id: $id) {
      id
    }
  }
`
