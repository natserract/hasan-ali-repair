export const EDITUSERPAGE_UPDATEUSERMUTATION = gql`
  mutation EditUserPageUpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`
