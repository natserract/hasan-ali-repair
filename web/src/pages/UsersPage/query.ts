export const USERSPAGE_USERS_QUERY = gql`
  query UsersPageUsersQuery {
    users {
      id
      name
      email
      user_type
      created_at
    }
  }
`
