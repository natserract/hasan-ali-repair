export const EDITPART_MUTATION = gql`
  mutation EditPart($id: Int!, $input: UpdatePartInput!) {
    updatePart(id: $id, input: $input) {
      id
    }
  }
`
