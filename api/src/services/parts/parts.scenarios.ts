import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PartCreateArgs>({
  part: {
    one: {
      data: {
        name: 'String',
        part_number: 5254962,
        qty: 8387198,
        price: 6432958.996946938,
      },
    },
    two: {
      data: {
        name: 'String',
        part_number: 2096715,
        qty: 492369,
        price: 5440854.04902707,
      },
    },
  },
})

export type StandardScenario = typeof standard
