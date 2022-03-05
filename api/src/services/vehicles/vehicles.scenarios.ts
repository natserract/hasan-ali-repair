import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.VehicleCreateArgs>({
  vehicle: {
    one: {
      data: {
        name: 'String',
        serialNum: 'String1199775',
        year: 6130222,
        created_by: 5713497,
      },
    },
    two: {
      data: {
        name: 'String',
        serialNum: 'String1976977',
        year: 2035017,
        created_by: 6158699,
      },
    },
  },
})

export type StandardScenario = typeof standard
