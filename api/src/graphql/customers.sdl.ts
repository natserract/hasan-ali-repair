export const schema = gql`
  type Customer {
    id: Int!
    user_id: Int!
    user: User!
    service: [Service]!
  }

  type Query {
    customers: [Customer!]! @requireAuth
    customer(id: Int!): Customer @requireAuth
  }

  input CreateCustomerInput {
    user_id: Int!
  }

  input UpdateCustomerInput {
    user_id: Int
  }

  type Mutation {
    createCustomer(input: CreateCustomerInput!): Customer! @requireAuth
    updateCustomer(id: Int!, input: UpdateCustomerInput!): Customer!
      @requireAuth
    deleteCustomer(id: Int!): Customer! @requireAuth
  }
`
