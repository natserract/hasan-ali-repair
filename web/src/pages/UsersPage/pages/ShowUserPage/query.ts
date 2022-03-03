export const SHOWUSERPAGE_USERQUERY = gql`
  query ShowUserPageUserQuery($id: Int!) {
    user(id: $id) {
      name
      email
      user_type
      address
      phone_number
      created_at
    }
  }
`
