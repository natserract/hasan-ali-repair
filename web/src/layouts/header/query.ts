export const HEADER_CURRENTUSER_QUERY = gql`
  query HeaderCurrentUserQuery($email: String) {
    currentUser(email: $email) {
      name
      email
      address
      phone_number
    }
  }
`
