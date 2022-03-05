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
        time_from: '2022-03-05T09:50:22Z',
        time_to: '2022-03-05T09:50:22Z',
        service_id: scenario.schedule.two.service_id,
      },
    })

    expect(result.time_from).toEqual('2022-03-05T09:50:22Z')
    expect(result.time_to).toEqual('2022-03-05T09:50:22Z')
    expect(result.service_id).toEqual(scenario.schedule.two.service_id)
  })

  scenario('updates a schedule', async (scenario: StandardScenario) => {
    const original = await schedule({ id: scenario.schedule.one.id })
    const result = await updateSchedule({
      id: original.id,
      input: { time_from: '2022-03-06T09:50:22Z' },
    })

    expect(result.time_from).toEqual('2022-03-06T09:50:22Z')
  })

  scenario('deletes a schedule', async (scenario: StandardScenario) => {
    const original = await deleteSchedule({ id: scenario.schedule.one.id })
    const result = await schedule({ id: original.id })

    expect(result).toEqual(null)
  })
})
