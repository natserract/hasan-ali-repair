import {
  vehicles,
  vehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from './vehicles'
import type { StandardScenario } from './vehicles.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('vehicles', () => {
  scenario('returns all vehicles', async (scenario: StandardScenario) => {
    const result = await vehicles()

    expect(result.length).toEqual(Object.keys(scenario.vehicle).length)
  })

  scenario('returns a single vehicle', async (scenario: StandardScenario) => {
    const result = await vehicle({ id: scenario.vehicle.one.id })

    expect(result).toEqual(scenario.vehicle.one)
  })

  scenario('creates a vehicle', async (scenario: StandardScenario) => {
    const result = await createVehicle({
      input: {
        name: 'String',
        serialNum: 'String6686250',
        year: 2636850,
        user_id: scenario.vehicle.two.user_id,
        created_by: 6422654,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.serialNum).toEqual('String6686250')
    expect(result.year).toEqual(2636850)
    expect(result.user_id).toEqual(scenario.vehicle.two.user_id)
    expect(result.created_by).toEqual(6422654)
  })

  scenario('updates a vehicle', async (scenario: StandardScenario) => {
    const original = await vehicle({ id: scenario.vehicle.one.id })
    const result = await updateVehicle({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a vehicle', async (scenario: StandardScenario) => {
    const original = await deleteVehicle({ id: scenario.vehicle.one.id })
    const result = await vehicle({ id: original.id })

    expect(result).toEqual(null)
  })
})
