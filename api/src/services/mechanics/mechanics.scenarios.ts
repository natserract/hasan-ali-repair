import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MechanicCreateArgs>({
  mechanic: {
    one: { data: { person_id: 7973394, name: 'String' } },
    two: { data: { person_id: 9968387, name: 'String' } },
  },
})

export type StandardScenario = typeof standard
