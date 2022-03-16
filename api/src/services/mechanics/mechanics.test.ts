import {
  mechanics,
  mechanic,
  createMechanic,
  updateMechanic,
  deleteMechanic,
} from './mechanics'
import type { StandardScenario } from './mechanics.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('mechanics', () => {
  scenario('returns all mechanics', async (scenario: StandardScenario) => {
    const result = await mechanics()

    expect(result.length).toEqual(Object.keys(scenario.mechanic).length)
  })

  scenario('returns a single mechanic', async (scenario: StandardScenario) => {
    const result = await mechanic({ id: scenario.mechanic.one.id })

    expect(result).toEqual(scenario.mechanic.one)
  })

  scenario('creates a mechanic', async () => {
    const result = await createMechanic({
      input: { person_id: 'String3535907', name: 'String' },
    })

    expect(result.person_id).toEqual('String3535907')
    expect(result.name).toEqual('String')
  })

  scenario('updates a mechanic', async (scenario: StandardScenario) => {
    const original = await mechanic({ id: scenario.mechanic.one.id })
    const result = await updateMechanic({
      id: original.id,
      input: { person_id: 'String94164382' },
    })

    expect(result.person_id).toEqual('String94164382')
  })

  scenario('deletes a mechanic', async (scenario: StandardScenario) => {
    const original = await deleteMechanic({ id: scenario.mechanic.one.id })
    const result = await mechanic({ id: original.id })

    expect(result).toEqual(null)
  })
})
