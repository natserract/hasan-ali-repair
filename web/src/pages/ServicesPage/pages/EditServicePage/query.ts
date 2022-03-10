export const EDITSERVICE_SHOWSERVICEQUERY = gql`
  query EditServiceShowServiceQuery($id: Int!) {
    service(id: $id) {
      id
      price
      mechanic {
        id
        name
        person_id
      }
      schedule {
        id
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
          id
          name
          part_number
          price
        }
      }

      created_at
    }
  }
`

export const MECHANICS_QUERY = gql`
  query MechanicsQuery {
    mechanics {
      id
      is_active
      name
    }
  }
`

export const EDITSERVICE_PARTSQUERY = gql`
  query EditServicePartsQuery {
    parts {
      id
      name
      part_number
      qty
      price
    }
  }
`
