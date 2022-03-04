export const USERSPAGE_DELETEUSERMUTATION = gql`
  mutation UsersPageDeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
      email
    }
  }
`
