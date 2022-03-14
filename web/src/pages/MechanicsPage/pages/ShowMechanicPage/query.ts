export const SHOWMECHANIC_QUERY = gql`
  query ShowMechanic($id: Int!) {
    mechanic(id: $id) {
      id
      name
      person_id
      is_active
      address
    }
  }
`
