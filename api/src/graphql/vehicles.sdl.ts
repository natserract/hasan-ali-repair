export const schema = gql`
  type Vehicle {
    id: Int!
    name: String!
    serialNum: String!
    year: Int!
    details: String
    created_by: Int!
    updated_by: Int
    created_at: DateTime
    updated_at: DateTime
    service: [Service]!
  }

  input VehiclesInput {
    sort: String
    filter: String
    start: Int
    limit: Int
  }

  type Query {
    vehicles(input: VehiclesInput): [Vehicle!]! @requireAuth
    vehicle(id: Int!): Vehicle @requireAuth
  }

  input CreateVehicleInput {
    name: String!
    serialNum: String!
    year: Int!
    details: String
    created_by: Int!
    updated_by: Int
    created_at: DateTime
    updated_at: DateTime
  }

  input UpdateVehicleInput {
    name: String
    serialNum: String
    year: Int
    details: String
    created_by: Int
    updated_by: Int
    created_at: DateTime
    updated_at: DateTime
  }

  type Mutation {
    createVehicle(input: CreateVehicleInput!): Vehicle! @requireAuth
    updateVehicle(id: Int!, input: UpdateVehicleInput!): Vehicle! @requireAuth
    deleteVehicle(id: Int!): Vehicle! @requireAuth
  }
`
