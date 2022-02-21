import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PartCreateArgs>({
  part: {
    one: {
      data: { part_number: 4965930, qty: 6595400, price: 179519.61249830006 },
    },
    two: {
      data: { part_number: 5049872, qty: 4077963, price: 2131712.0010613543 },
    },
  },
})

export type StandardScenario = typeof standard
