export const CREATEVEHICLE_MUTATION = gql`
  mutation CreateVehicleMutation($input: CreateVehicleInput!) {
    createVehicle(input: $input) {
      id
    }
  }
`
