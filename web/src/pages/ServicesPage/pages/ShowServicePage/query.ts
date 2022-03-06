export const SHOWSERVICE_QUERY = gql`
  query ShowServiceQuery($id: Int!) {
    service(id: $id) {
      id
      customer {
        user {
          name
        }
      }
      schedule {
        id
        time_from
        time_to
      }
      mechanic {
        id
        name
        person_id
      }
      vehicle {
        name
        serialNum
      }
      status
      partsUsed {
        id
        parts {
          name
          part_number
        }
      }
      message
    }
  }
`
