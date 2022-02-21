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

  scenario('creates a vehicle', async () => {
    const result = await createVehicle({
      input: {
        serialNum: 6677443,
        year: 7974112,
        created_by: 1616016,
        updated_by: 7241103,
      },
    })

    expect(result.serialNum).toEqual(6677443)
    expect(result.year).toEqual(7974112)
    expect(result.created_by).toEqual(1616016)
    expect(result.updated_by).toEqual(7241103)
  })

  scenario('updates a vehicle', async (scenario: StandardScenario) => {
    const original = await vehicle({ id: scenario.vehicle.one.id })
    const result = await updateVehicle({
      id: original.id,
      input: { serialNum: 9533395 },
    })

    expect(result.serialNum).toEqual(9533395)
  })

  scenario('deletes a vehicle', async (scenario: StandardScenario) => {
    const original = await deleteVehicle({ id: scenario.vehicle.one.id })
    const result = await vehicle({ id: original.id })

    expect(result).toEqual(null)
  })
})
