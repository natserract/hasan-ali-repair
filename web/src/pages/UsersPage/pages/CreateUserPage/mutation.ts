export const CREATEUSERPAGE_CREATEUSERMUTATION = gql`
  mutation CreateUserPageCreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`
