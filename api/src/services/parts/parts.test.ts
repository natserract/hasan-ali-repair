import { parts, part, createPart, updatePart, deletePart } from './parts'
import type { StandardScenario } from './parts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('parts', () => {
  scenario('returns all parts', async (scenario: StandardScenario) => {
    const result = await parts()

    expect(result.length).toEqual(Object.keys(scenario.part).length)
  })

  scenario('returns a single part', async (scenario: StandardScenario) => {
    const result = await part({ id: scenario.part.one.id })

    expect(result).toEqual(scenario.part.one)
  })

  scenario('creates a part', async () => {
    const result = await createPart({
      input: { part_number: 2409396, qty: 8107850, price: 8134793.261014941 },
    })

    expect(result.part_number).toEqual(2409396)
    expect(result.qty).toEqual(8107850)
    expect(result.price).toEqual(8134793.261014941)
  })

  scenario('updates a part', async (scenario: StandardScenario) => {
    const original = await part({ id: scenario.part.one.id })
    const result = await updatePart({
      id: original.id,
      input: { part_number: 3921842 },
    })

    expect(result.part_number).toEqual(3921842)
  })

  scenario('deletes a part', async (scenario: StandardScenario) => {
    const original = await deletePart({ id: scenario.part.one.id })
    const result = await part({ id: original.id })

    expect(result).toEqual(null)
  })
})
