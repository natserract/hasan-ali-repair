import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ScheduleCreateArgs>({
  schedule: {
    one: {
      data: {
        booking_date: '2022-03-07T05:23:04Z',
        customer: {
          create: {
            user: {
              create: {
                name: 'String',
                password: 'String',
                email: 'String7408180',
                user_type: 'String',
              },
            },
          },
        },
        vehicle: {
          create: {
            name: 'String',
            serialNum: 'String622618',
            year: 9197322,
            created_by: 7308646,
            user: {
              create: {
                name: 'String',
                password: 'String',
                email: 'String4149028',
                user_type: 'String',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        booking_date: '2022-03-07T05:23:04Z',
        customer: {
          create: {
            user: {
              create: {
                name: 'String',
                password: 'String',
                email: 'String6731244',
                user_type: 'String',
              },
            },
          },
        },
        vehicle: {
          create: {
            name: 'String',
            serialNum: 'String9069786',
            year: 5254509,
            created_by: 9211920,
            user: {
              create: {
                name: 'String',
                password: 'String',
                email: 'String209137',
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
