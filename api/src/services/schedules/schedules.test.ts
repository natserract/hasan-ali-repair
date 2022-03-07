import {
  schedules,
  schedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from './schedules'
import type { StandardScenario } from './schedules.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('schedules', () => {
  scenario('returns all schedules', async (scenario: StandardScenario) => {
    const result = await schedules()

    expect(result.length).toEqual(Object.keys(scenario.schedule).length)
  })

  scenario('returns a single schedule', async (scenario: StandardScenario) => {
    const result = await schedule({ id: scenario.schedule.one.id })

    expect(result).toEqual(scenario.schedule.one)
  })

  scenario('creates a schedule', async (scenario: StandardScenario) => {
    const result = await createSchedule({
      input: {
        booking_date: '2022-03-07T05:23:04Z',
        customer_id: scenario.schedule.two.customer_id,
        vehicle_id: scenario.schedule.two.vehicle_id,
      },
    })

    expect(result.booking_date).toEqual('2022-03-07T05:23:04Z')
    expect(result.customer_id).toEqual(scenario.schedule.two.customer_id)
    expect(result.vehicle_id).toEqual(scenario.schedule.two.vehicle_id)
  })

  scenario('updates a schedule', async (scenario: StandardScenario) => {
    const original = await schedule({ id: scenario.schedule.one.id })
    const result = await updateSchedule({
      id: original.id,
      input: { booking_date: '2022-03-08T05:23:04Z' },
    })

    expect(result.booking_date).toEqual('2022-03-08T05:23:04Z')
  })

  scenario('deletes a schedule', async (scenario: StandardScenario) => {
    const original = await deleteSchedule({ id: scenario.schedule.one.id })
    const result = await schedule({ id: original.id })

    expect(result).toEqual(null)
  })
})
