import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        name: 'String',
        password: 'String',
        email: 'String2590611',
        user_type: 'String',
      },
    },
    two: {
      data: {
        name: 'String',
        password: 'String',
        email: 'String2530139',
        user_type: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
