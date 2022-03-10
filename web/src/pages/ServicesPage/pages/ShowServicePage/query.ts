export const SHOWSERVICE_QUERY = gql`
  query ShowServiceQuery($id: Int!) {
    service(id: $id) {
      id
      price
      mechanic {
        name
        person_id
      }
      schedule {
        booking_date
        message
        status

        customer {
          user {
            name
          }
        }

        vehicle {
          name
          serialNum
        }
      }

      partsUsed {
        parts {
          name
          part_number
        }
      }

      created_at
    }
  }
`
