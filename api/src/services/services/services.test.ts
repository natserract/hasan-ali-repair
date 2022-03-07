import {
  services,
  service,
  createService,
  updateService,
  deleteService,
} from './services'
import type { StandardScenario } from './services.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('services', () => {
  scenario('returns all services', async (scenario: StandardScenario) => {
    const result = await services()

    expect(result.length).toEqual(Object.keys(scenario.service).length)
  })

  scenario('returns a single service', async (scenario: StandardScenario) => {
    const result = await service({ id: scenario.service.one.id })

    expect(result).toEqual(scenario.service.one)
  })

  scenario('creates a service', async (scenario: StandardScenario) => {
    const result = await createService({
      input: {
        created_by: 2066364,
        mechanic_id: scenario.service.two.mechanic_id,
        schedule_id: scenario.service.two.schedule_id,
      },
    })

    expect(result.created_by).toEqual(2066364)
    expect(result.mechanic_id).toEqual(scenario.service.two.mechanic_id)
    expect(result.schedule_id).toEqual(scenario.service.two.schedule_id)
  })

  scenario('updates a service', async (scenario: StandardScenario) => {
    const original = await service({ id: scenario.service.one.id })
    const result = await updateService({
      id: original.id,
      input: { created_by: 1627605 },
    })

    expect(result.created_by).toEqual(1627605)
  })

  scenario('deletes a service', async (scenario: StandardScenario) => {
    const original = await deleteService({ id: scenario.service.one.id })
    const result = await service({ id: original.id })

    expect(result).toEqual(null)
  })
})
