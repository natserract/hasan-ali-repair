export const schema = gql`
  type PartUsed {
    id: Int!
    part_id: Int!
    parts: Part!
    mechanic_id: Int!
    mechanic: Mechanic!
    service_id: Int!
    service: Service!
  }

  type Query {
    partUseds: [PartUsed!]! @requireAuth
    partUsed(id: Int!): PartUsed @requireAuth
  }

  input CreatePartUsedInput {
    part_id: Int!
    mechanic_id: Int!
    service_id: Int!
  }

  input UpdatePartUsedInput {
    part_id: Int
    mechanic_id: Int
    service_id: Int
  }

  type Mutation {
    createPartUsed(input: CreatePartUsedInput!): PartUsed! @requireAuth
    updatePartUsed(id: Int!, input: UpdatePartUsedInput!): PartUsed!
      @requireAuth
    deletePartUsed(id: Int!): PartUsed! @requireAuth
  }
`