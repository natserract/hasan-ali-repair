export const schema = gql`
  type PartUsed {
    id: Int!
    used_qty: Int!
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
    used_qty: Int!
    part_id: Int!
    mechanic_id: Int!
    service_id: Int!
  }

  input UpdatePartUsedInput {
    used_qty: Int
    part_id: Int
    mechanic_id: Int
    service_id: Int
  }

  type Mutation {
    createPartUsed(input: CreatePartUsedInput!): PartUsed! @skipAuth
    updatePartUsed(id: Int!, input: UpdatePartUsedInput!): PartUsed!
      @requireAuth
    deletePartUsed(id: Int!): PartUsed! @requireAuth
  }
`
