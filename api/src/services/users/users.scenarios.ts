import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: { name: 'String', email: 'String7840126', user_type: 'String' },
    },
    two: {
      data: { name: 'String', email: 'String6820115', user_type: 'String' },
    },
  },
})

export type StandardScenario = typeof standard
