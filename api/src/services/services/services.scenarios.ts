import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ServiceCreateArgs>({
  service: {
    one: {
      data: {
        created_by: 9442128,
        mechanic: { create: { person_id: 9869177, name: 'String' } },
        schedule: {
          create: {
            booking_date: '2022-03-07T05:25:46Z',
            customer: {
              create: {
                user: {
                  create: {
                    name: 'String',
                    password: 'String',
                    email: 'String89995',
                    user_type: 'String',
                  },
                },
              },
            },
            vehicle: {
              create: {
                name: 'String',
                serialNum: 'String8577946',
                year: 5981869,
                created_by: 3294030,
                user: {
                  create: {
                    name: 'String',
                    password: 'String',
                    email: 'String6126645',
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
        created_by: 3060790,
        mechanic: { create: { person_id: 9883060, name: 'String' } },
        schedule: {
          create: {
            booking_date: '2022-03-07T05:25:46Z',
            customer: {
              create: {
                user: {
                  create: {
                    name: 'String',
                    password: 'String',
                    email: 'String2930301',
                    user_type: 'String',
                  },
                },
              },
            },
            vehicle: {
              create: {
                name: 'String',
                serialNum: 'String5877470',
                year: 7353664,
                created_by: 7381864,
                user: {
                  create: {
                    name: 'String',
                    password: 'String',
                    email: 'String6546822',
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
