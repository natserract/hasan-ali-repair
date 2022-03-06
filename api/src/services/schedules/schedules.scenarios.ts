import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ScheduleCreateArgs>({
  schedule: {
    one: {
      data: {
        time_from: '2022-03-06T04:18:43Z',
        time_to: '2022-03-06T04:18:43Z',
        service: {
          create: {
            created_by: 7580877,
            vehicle: {
              create: {
                name: 'String',
                serialNum: 'String8709684',
                year: 4872764,
                created_by: 8513685,
              },
            },
            mechanic: { create: { person_id: 9056938, name: 'String' } },
            customer: {
              create: {
                user: {
                  create: {
                    name: 'String',
                    password: 'String',
                    email: 'String1358539',
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
        time_from: '2022-03-06T04:18:43Z',
        time_to: '2022-03-06T04:18:43Z',
        service: {
          create: {
            created_by: 5956272,
            vehicle: {
              create: {
                name: 'String',
                serialNum: 'String9014152',
                year: 4656625,
                created_by: 6831752,
              },
            },
            mechanic: { create: { person_id: 4479326, name: 'String' } },
            customer: {
              create: {
                user: {
                  create: {
                    name: 'String',
                    password: 'String',
                    email: 'String7165526',
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
