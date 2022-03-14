export const DELETEMECHANIC_MUTATION = gql`
  mutation DeleteMechanicMutation($id: Int!) {
    deleteMechanic(id: $id) {
      id
    }
  }
`
