export const EDITVEHICLEMUTATION = gql`
  mutation EditVehicleMutation($id: Int!, $input: UpdateVehicleInput!) {
    updateVehicle(id: $id, input: $input) {
      id
    }
  }
`
