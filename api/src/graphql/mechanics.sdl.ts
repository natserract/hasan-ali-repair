export const schema = gql`
  type Mechanic {
    id: Int!
    person_id: Int!
    name: String!
    is_active: Boolean!
    address: String
    created_at: DateTime
    updated_at: DateTime
    Service: [Service]!
    PartsUsed: [PartUsed]!
  }

  type Query {
    mechanics: [Mechanic!]! @requireAuth
    mechanic(id: Int!): Mechanic @requireAuth
  }

  input CreateMechanicInput {
    person_id: Int!
    name: String!
    is_active: Boolean!
    address: String
    created_at: DateTime
    updated_at: DateTime
  }

  input UpdateMechanicInput {
    person_id: Int
    name: String
    is_active: Boolean
    address: String
    created_at: DateTime
    updated_at: DateTime
  }

  type Mutation {
    createMechanic(input: CreateMechanicInput!): Mechanic! @requireAuth
    updateMechanic(id: Int!, input: UpdateMechanicInput!): Mechanic!
      @requireAuth
    deleteMechanic(id: Int!): Mechanic! @requireAuth
  }
`