export const DELETESCHEDULE_MUTATION = gql`
  mutation DeleteScheduleMutation($id: Int!) {
    deleteSchedule(id: $id) {
      id
    }
  }
`
