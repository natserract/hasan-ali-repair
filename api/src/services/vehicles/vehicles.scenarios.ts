import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.VehicleCreateArgs>({
  vehicle: {
    one: {
      data: {
        serialNum: 3092029,
        year: 7182476,
        created_by: 1562388,
        updated_by: 6276978,
      },
    },
    two: {
      data: {
        serialNum: 6020581,
        year: 9316635,
        created_by: 2260246,
        updated_by: 2751547,
      },
    },
  },
})

export type StandardScenario = typeof standard
