import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        name: 'String',
        password: 'String',
        email: 'String6707867',
        user_type: 'String',
      },
    },
    two: {
      data: {
        name: 'String',
        password: 'String',
        email: 'String2908563',
        user_type: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
