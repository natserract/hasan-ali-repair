export const PARTSPAGE_PARTS_QUERY = gql`
  query PartsPagePartsQuery {
    parts {
      id
      name
      part_number
      qty
      price
      description
    }
  }
`
