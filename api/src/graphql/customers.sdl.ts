export const schema = gql`
  type Customer {
    id: Int!
    user_id: Int!
    user: User!
    service: [Service]!
  }

  input CustomersInput {
    sort: String
    filter: String
    start: Int
    limit: Int
  }

  type Query {
    customers(input: CustomersInput): [Customer!]! @skipAuth
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
