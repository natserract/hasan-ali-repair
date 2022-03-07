export const schema = gql`
  type Schedule {
    id: Int!
    booking_date: DateTime!
    customer_id: Int!
    customer: Customer!
    vehicle_id: Int!
    vehicle: Vehicle!
    status: String
    message: String
    created_at: DateTime
    updated_at: DateTime
    service: [Service]!
  }

  input ScheduleInput {
    sort: String
    filter: String
    start: Int
    limit: Int
  }

  type Query {
    schedules(input: ScheduleInput): [Schedule!]! @skipAuth
    schedule(id: Int!): Schedule @requireAuth
  }

  input CreateScheduleInput {
    booking_date: DateTime!
    customer_id: Int!
    vehicle_id: Int!
    status: String
    message: String
    created_at: DateTime
    updated_at: DateTime
  }

  input UpdateScheduleInput {
    booking_date: DateTime
    customer_id: Int
    vehicle_id: Int
    status: String
    message: String
    created_at: DateTime
    updated_at: DateTime
  }

  type Mutation {
    createSchedule(input: CreateScheduleInput!): Schedule! @skipAuth
    updateSchedule(id: Int!, input: UpdateScheduleInput!): Schedule! @skipAuth
    deleteSchedule(id: Int!): Schedule! @requireAuth
  }
`
