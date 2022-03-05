import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ScheduleCreateArgs>({
  schedule: {
    one: {
      data: {
        time_from: '2022-03-05T09:50:22Z',
        time_to: '2022-03-05T09:50:22Z',
        service: {
          create: {
            created_by: 9125734,
            vehicle: {
              create: {
                name: 'String',
                serialNum: 'String1022276',
                year: 2848020,
                created_by: 8305105,
              },
            },
            mechanic: { create: { person_id: 8106436, name: 'String' } },
            customer: {
              create: {
                user: {
                  create: {
                    name: 'String',
                    password: 'String',
                    email: 'String2373052',
                    user_type: 'String',
                  },
                },
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        time_from: '2022-03-05T09:50:22Z',
        time_to: '2022-03-05T09:50:22Z',
        service: {
          create: {
            created_by: 8085176,
            vehicle: {
              create: {
                name: 'String',
                serialNum: 'String4761640',
                year: 2956757,
                created_by: 6239297,
              },
            },
            mechanic: { create: { person_id: 467478, name: 'String' } },
            customer: {
              create: {
                user: {
                  create: {
                    name: 'String',
                    password: 'String',
                    email: 'String8263667',
                    user_type: 'String',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
