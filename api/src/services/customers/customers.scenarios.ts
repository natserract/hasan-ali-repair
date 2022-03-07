import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CustomerCreateArgs>({
  customer: {
    one: {
      data: {
        user: {
          create: {
            name: 'String',
            password: 'String',
            email: 'String5110548',
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
            email: 'String9487773',
            user_type: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
