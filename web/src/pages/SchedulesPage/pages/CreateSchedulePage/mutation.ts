export const CREATESCHEDULE_MUTATION = gql`
  mutation CreateScheduleMutation($input: CreateScheduleInput!) {
    createSchedule(input: $input) {
      id
    }
  }
`
