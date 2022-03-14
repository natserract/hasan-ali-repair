export const EDITMECHANIC_MUTATION = gql`
  mutation EditMechanicMutation($id: Int!, $input: UpdateMechanicInput!) {
    updateMechanic(id: $id, input: $input) {
      id
    }
  }
`
