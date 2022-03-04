export const schema = gql`
  type User {
    id: Int!
    uuid: String
    name: String!
    email: String!
    password: String
    hashedPassword: String!
    salt: String!
    refreshToken: String
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
    name: String!
    email: String!
    password: String!
    hashedPassword: String!
    refreshToken: String
    user_type: String!
    created_at: DateTime
    updated_at: DateTime
    phone_number: String
    address: String
  }

  input UpdateUserInput {
    uuid: String
    name: String
    email: String
    password: String
    hashedPassword: String
    salt: String
    refreshToken: String
    user_type: String
    created_at: DateTime
    updated_at: DateTime
    phone_number: String
    address: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @skipAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
