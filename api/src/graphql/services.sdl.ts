export const schema = gql`
  type Service {
    id: Int!
    uuid: String
    status: String!
    message: String
    price: Float
    created_by: Int!
    updated_by: Int!
    vehicle_id: Int!
    vehicle: Vehicle!
    mechanic_id: Int!
    mechanic: Mechanic!
    created_at: DateTime
    updated_at: DateTime
    Customer: [Customer]!
    PartsUsed: [PartUsed]!
    Schedule: [Schedule]!
  }

  type Query {
    services: [Service!]! @requireAuth
    service(id: Int!): Service @requireAuth
  }

  input CreateServiceInput {
    uuid: String
    status: String!
    message: String
    price: Float
    created_by: Int!
    updated_by: Int!
    vehicle_id: Int!
    mechanic_id: Int!
    created_at: DateTime
    updated_at: DateTime
  }

  input UpdateServiceInput {
    uuid: String
    status: String
    message: String
    price: Float
    created_by: Int
    updated_by: Int
    vehicle_id: Int
    mechanic_id: Int
    created_at: DateTime
    updated_at: DateTime
  }

  type Mutation {
    createService(input: CreateServiceInput!): Service! @requireAuth
    updateService(id: Int!, input: UpdateServiceInput!): Service! @requireAuth
    deleteService(id: Int!): Service! @requireAuth
  }
`
