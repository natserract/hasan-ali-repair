export const DELETESCHEDULE_MUTATION = gql`
  mutation DeleteScheduleMutation($id: Int!) {
    deleteSchedule(id: $id) {
      id
    }
  }
`

export const BOOKINGSAPPOINTMENT_MUTATION = gql`
  mutation BookingAppointmentMutation($id: Int!, $input: UpdateScheduleInput!) {
    updateSchedule(id: $id, input: $input) {
      id
    }
  }
`
