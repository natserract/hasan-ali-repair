export const schema = gql`
  type User {
    id: Int!
    uuid: String
    name: String!
    password: String!
    email: String!
    user_type: String!
    created_at: DateTime
    updated_at: DateTime
    phone_number: String
    address: String
    Customer: [Customer]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    uuid: String
    name: String!
    password: String!
    email: String!
    user_type: String!
    created_at: DateTime
    updated_at: DateTime
    phone_number: String
    address: String
  }

  input UpdateUserInput {
    uuid: String
    name: String
    password: String
    email: String
    user_type: String
    created_at: DateTime
    updated_at: DateTime
    phone_number: String
    address: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
