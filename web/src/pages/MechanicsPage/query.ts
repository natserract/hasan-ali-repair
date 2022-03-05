export const MECHANICS_QUERY = gql`
  query Mechanics {
    mechanics {
      id
      person_id
      name
      is_active
      address
    }
  }
`
