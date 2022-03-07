export const schema = gql`
  type Service {
    id: Int!
    uuid: String
    price: Float
    created_by: Int!
    updated_by: Int
    mechanic_id: Int!
    mechanic: Mechanic!
    schedule_id: Int!
    schedule: Schedule!
    created_at: DateTime
    updated_at: DateTime
    partsUsed: [PartUsed]!
  }

  input ServicesInput {
    sort: String
    filter: String
    start: Int
    limit: Int
  }

  type Query {
    services(input: ServicesInput): [Service!]! @skipAuth
    service(id: Int!): Service @skipAuth
  }

  input CreateServiceInput {
    uuid: String
    price: Float
    created_by: Int!
    updated_by: Int
    mechanic_id: Int!
    schedule_id: Int!
    created_at: DateTime
    updated_at: DateTime
  }

  input UpdateServiceInput {
    uuid: String
    price: Float
    created_by: Int
    updated_by: Int
    mechanic_id: Int
    schedule_id: Int
    created_at: DateTime
    updated_at: DateTime
  }

  type Mutation {
    createService(input: CreateServiceInput!): Service! @skipAuth
    updateService(id: Int!, input: UpdateServiceInput!): Service! @requireAuth
    deleteService(id: Int!): Service! @requireAuth
  }
`
