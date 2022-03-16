import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MechanicCreateArgs>({
  mechanic: {
    one: { data: { person_id: 'String5919763', name: 'String' } },
    two: { data: { person_id: 'String6963354', name: 'String' } },
  },
})

export type StandardScenario = typeof standard
