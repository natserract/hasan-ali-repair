export const PARTS_DELETEPARTMUTATION = gql`
  mutation DeletePartMutation($id: Int!) {
    deletePart(id: $id) {
      id
    }
  }
`
