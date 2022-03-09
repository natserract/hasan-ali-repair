import {
  partUseds,
  partUsed,
  createPartUsed,
  updatePartUsed,
  deletePartUsed,
} from './partUseds'
import type { StandardScenario } from './partUseds.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('partUseds', () => {
  scenario('returns all partUseds', async (scenario: StandardScenario) => {
    const result = await partUseds()

    expect(result.length).toEqual(Object.keys(scenario.partUsed).length)
  })

  scenario('returns a single partUsed', async (scenario: StandardScenario) => {
    const result = await partUsed({ id: scenario.partUsed.one.id })

    expect(result).toEqual(scenario.partUsed.one)
  })

  scenario('creates a partUsed', async (scenario: StandardScenario) => {
    const result = await createPartUsed({
      input: {
        part_id: scenario.partUsed.two.part_id,
        mechanic_id: scenario.partUsed.two.mechanic_id,
        service_id: scenario.partUsed.two.service_id,
      },
    })

    expect(result.part_id).toEqual(scenario.partUsed.two.part_id)
    expect(result.mechanic_id).toEqual(scenario.partUsed.two.mechanic_id)
    expect(result.service_id).toEqual(scenario.partUsed.two.service_id)
  })

  scenario('updates a partUsed', async (scenario: StandardScenario) => {
    const original = await partUsed({ id: scenario.partUsed.one.id })
    const result = await updatePartUsed({
      id: original.id,
      input: { part_id: scenario.partUsed.two.part_id },
    })

    expect(result.part_id).toEqual(scenario.partUsed.two.part_id)
  })

  scenario('deletes a partUsed', async (scenario: StandardScenario) => {
    const original = await deletePartUsed({ id: scenario.partUsed.one.id })
    const result = await partUsed({ id: original.id })

    expect(result).toEqual(null)
  })
})
