import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PartCreateArgs>({
  part: {
    one: {
      data: {
        name: 'String',
        part_number: 3769712,
        qty: 2600588,
        price: 1984133.9300671157,
      },
    },
    two: {
      data: {
        name: 'String',
        part_number: 9554567,
        qty: 5630358,
        price: 9744147.092750372,
      },
    },
  },
})

export type StandardScenario = typeof standard
