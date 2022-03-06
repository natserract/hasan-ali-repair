export const EDITSERVICES_MUTATION = gql`
  mutation EditServicesMutation($id: Int!, $input: UpdateServiceInput!) {
    updateService(id: $id, input: $input) {
      id
    }
  }
`
