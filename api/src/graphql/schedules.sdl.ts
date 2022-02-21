export const schema = gql`
  type Schedule {
    id: Int!
    time_from: DateTime!
    time_to: DateTime!
    created_at: DateTime
    updated_at: DateTime
    service_id: Int!
    service: Service!
    Customer: [Customer]!
  }

  type Query {
    schedules: [Schedule!]! @requireAuth
    schedule(id: Int!): Schedule @requireAuth
  }

  input CreateScheduleInput {
    time_from: DateTime!
    time_to: DateTime!
    created_at: DateTime
    updated_at: DateTime
    service_id: Int!
  }

  input UpdateScheduleInput {
    time_from: DateTime
    time_to: DateTime
    created_at: DateTime
    updated_at: DateTime
    service_id: Int
  }

  type Mutation {
    createSchedule(input: CreateScheduleInput!): Schedule! @requireAuth
    updateSchedule(id: Int!, input: UpdateScheduleInput!): Schedule!
      @requireAuth
    deleteSchedule(id: Int!): Schedule! @requireAuth
  }
`
