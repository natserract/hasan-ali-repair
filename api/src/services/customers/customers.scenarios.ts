import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CustomerCreateArgs>({
  customer: {
    one: {
      data: {
        user: {
          create: {
            name: 'String',
            password: 'String',
            email: 'String552086',
            user_type: 'String',
          },
        },
      },
    },
    two: {
      data: {
        user: {
          create: {
            name: 'String',
            password: 'String',
            email: 'String1988498',
            user_type: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
