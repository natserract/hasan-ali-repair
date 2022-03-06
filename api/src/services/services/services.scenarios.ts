import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ServiceCreateArgs>({
  service: {
    one: {
      data: {
        created_by: 229375,
        vehicle: {
          create: {
            name: 'String',
            serialNum: 'String8666909',
            year: 3447133,
            created_by: 6592690,
          },
        },
        mechanic: { create: { person_id: 1776807, name: 'String' } },
        customer: {
          create: {
            user: {
              create: {
                name: 'String',
                password: 'String',
                email: 'String5912287',
                user_type: 'String',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        created_by: 9822285,
        vehicle: {
          create: {
            name: 'String',
            serialNum: 'String3316693',
            year: 3084972,
            created_by: 4347310,
          },
        },
        mechanic: { create: { person_id: 9697635, name: 'String' } },
        customer: {
          create: {
            user: {
              create: {
                name: 'String',
                password: 'String',
                email: 'String1255373',
                user_type: 'String',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
