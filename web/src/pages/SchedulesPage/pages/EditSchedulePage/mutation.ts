export const EDITSCHEDULE_MUTATION = gql`
  mutation EditScheduleMutation($id: Int!, $input: UpdateScheduleInput!) {
    updateSchedule(id: $id, input: $input) {
      id
    }
  }
`
