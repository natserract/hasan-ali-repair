export const CREATEMECHANIC_MUTATION = gql`
  mutation CreateMechanicMutation($input: CreateMechanicInput!) {
    createMechanic(input: $input) {
      id
    }
  }
`
