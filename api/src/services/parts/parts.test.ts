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
      input: {
        name: 'String',
        part_number: 7270890,
        qty: 9589053,
        price: 4587530.66077622,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.part_number).toEqual(7270890)
    expect(result.qty).toEqual(9589053)
    expect(result.price).toEqual(4587530.66077622)
  })

  scenario('updates a part', async (scenario: StandardScenario) => {
    const original = await part({ id: scenario.part.one.id })
    const result = await updatePart({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a part', async (scenario: StandardScenario) => {
    const original = await deletePart({ id: scenario.part.one.id })
    const result = await part({ id: original.id })

    expect(result).toEqual(null)
  })
})
