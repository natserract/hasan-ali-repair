export const EDITUSERPAGE_USERQUERY = gql`
  query EditUserPage_UserQuery($id: Int!) {
    user(id: $id) {
      name
      email
      password
      address
      phone_number
      user_type
      created_at
    }
  }
`
