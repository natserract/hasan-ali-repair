
export const REGISTERPAGE_CREATEUSERMUTATION = gql`
  mutation RegisterPageCreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`
