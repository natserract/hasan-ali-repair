export const schema = gql`
  type Vehicle {
    id: Int!
    serialNum: Int!
    year: Int!
    details: String
    created_by: Int!
    updated_by: Int!
    created_at: DateTime
    updated_at: DateTime
    Service: [Service]!
  }

  type Query {
    vehicles: [Vehicle!]! @requireAuth
    vehicle(id: Int!): Vehicle @requireAuth
  }

  input CreateVehicleInput {
    serialNum: Int!
    year: Int!
    details: String
    created_by: Int!
    updated_by: Int!
    created_at: DateTime
    updated_at: DateTime
  }

  input UpdateVehicleInput {
    serialNum: Int
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
