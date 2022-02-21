export const schema = gql`
  type Part {
    id: Int!
    part_number: Int!
    in_date: DateTime
    qty: Int!
    price: Float!
    description: String
    PartsUsed: [PartUsed]!
  }

  type Query {
    parts: [Part!]! @requireAuth
    part(id: Int!): Part @requireAuth
  }

  input CreatePartInput {
    part_number: Int!
    in_date: DateTime
    qty: Int!
    price: Float!
    description: String
  }

  input UpdatePartInput {
    part_number: Int
    in_date: DateTime
    qty: Int
    price: Float
    description: String
  }

  type Mutation {
    createPart(input: CreatePartInput!): Part! @requireAuth
    updatePart(id: Int!, input: UpdatePartInput!): Part! @requireAuth
    deletePart(id: Int!): Part! @requireAuth
  }
`
