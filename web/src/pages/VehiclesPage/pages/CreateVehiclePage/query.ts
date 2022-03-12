export const CREATEVEHICLE_CUSTOMERSQUERY = gql`
  query CreateVehiclePageCustomersQuery {
    customers {
      id
      user_id
      user {
        id
        name
        email
      }
    }
  }
`
