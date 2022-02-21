import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ServiceCreateArgs>({
  service: {
    one: {
      data: {
        created_by: 1575047,
        updated_by: 6995431,
        vehicle: {
          create: {
            serialNum: 5767327,
            year: 8561470,
            created_by: 4920323,
            updated_by: 2432852,
          },
        },
        mechanic: { create: { person_id: 7755210, name: 'String' } },
      },
    },
    two: {
      data: {
        created_by: 6905795,
        updated_by: 2052112,
        vehicle: {
          create: {
            serialNum: 2762114,
            year: 3170157,
            created_by: 3959350,
            updated_by: 3352409,
          },
        },
        mechanic: { create: { person_id: 2992845, name: 'String' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
