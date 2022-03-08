export const DELETESERVICE_MUTATION = gql`
  mutation DeleteServiceMutation($id: Int!) {
    deleteService(id: $id) {
      id
    }
  }
`
export const SERVICES_UPDATESCHEDULEMUTATION = gql`
  mutation ServicesUpdateScheduleMutation(
    $id: Int!
    $input: UpdateScheduleInput!
  ) {
    updateSchedule(id: $id, input: $input) {
      id
    }
  }
`
