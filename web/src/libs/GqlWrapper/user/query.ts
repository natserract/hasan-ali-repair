
export const REDWOOD_USERQUERY = gql`
  query RedwoodUserQuery($id: Int!) {
    user (id: $id) {
      name
      email
      address
      phone_number
      user_type
    }
  }
`
