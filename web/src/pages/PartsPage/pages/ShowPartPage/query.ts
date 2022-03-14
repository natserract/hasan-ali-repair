export const SHOWPART_QUERY = gql`
  query ShowPart($id: Int!) {
    part(id: $id) {
      name
      part_number
      in_date
      price
      qty
      description
    }
  }
`
