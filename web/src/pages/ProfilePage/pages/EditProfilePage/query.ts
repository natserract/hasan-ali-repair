export const EDITPROFILE_CURRENTUSER_QUERY = gql`
  query EditProfileCurrentUserQuery($email: String!) {
    currentUser(email: $email) {
      name
      email
      address
      phone_number
    }
  }
`
