import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: { name: 'String', email: 'String249992', user_type: 'String' },
    },
    two: {
      data: { name: 'String', email: 'String2293053', user_type: 'String' },
    },
  },
})

export type StandardScenario = typeof standard
