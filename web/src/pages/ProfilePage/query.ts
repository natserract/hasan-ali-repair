export const PROFILEPAGE_CURRENTUSER_QUERY = gql`
  query ProfilePageCurrentUserQuery($email: String!) {
    currentUser(email: $email) {
      name
      email
      address
      phone_number
    }
  }
`
