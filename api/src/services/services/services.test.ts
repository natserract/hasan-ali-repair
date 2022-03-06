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
        created_by: 9815602,
        vehicle_id: scenario.service.two.vehicle_id,
        mechanic_id: scenario.service.two.mechanic_id,
        customer_id: scenario.service.two.customer_id,
      },
    })

    expect(result.created_by).toEqual(9815602)
    expect(result.vehicle_id).toEqual(scenario.service.two.vehicle_id)
    expect(result.mechanic_id).toEqual(scenario.service.two.mechanic_id)
    expect(result.customer_id).toEqual(scenario.service.two.customer_id)
  })

  scenario('updates a service', async (scenario: StandardScenario) => {
    const original = await service({ id: scenario.service.one.id })
    const result = await updateService({
      id: original.id,
      input: { created_by: 4520486 },
    })

    expect(result.created_by).toEqual(4520486)
  })

  scenario('deletes a service', async (scenario: StandardScenario) => {
    const original = await deleteService({ id: scenario.service.one.id })
    const result = await service({ id: original.id })

    expect(result).toEqual(null)
  })
})
