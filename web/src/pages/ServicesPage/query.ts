export const SERVICESPAGE_SERVICES_QUERY = gql`
  query ServicesPageServicesQuery($input: ServicesInput) {
    services(input: $input) {
      id

      mechanic {
        name
      }

      # Booking date
      schedule {
        id
        booking_date

        # Status
        status

        # Vehicle Name
        vehicle {
          name
          serialNum
        }

        # User
        customer {
          user {
            name
          }
        }

        service {
          partsUsed {
            used_qty
            parts {
              id
              name
            }
          }
        }
      }
    }
  }
`
