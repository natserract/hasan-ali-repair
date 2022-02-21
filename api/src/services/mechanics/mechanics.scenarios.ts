import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MechanicCreateArgs>({
  mechanic: {
    one: { data: { person_id: 1694531, name: 'String' } },
    two: { data: { person_id: 2986917, name: 'String' } },
  },
})

export type StandardScenario = typeof standard
