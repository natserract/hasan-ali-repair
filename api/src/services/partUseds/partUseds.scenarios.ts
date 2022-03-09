import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PartUsedCreateArgs>({
  partUsed: {
    one: {
      data: {
        parts: {
          create: {
            name: 'String',
            part_number: 7936629,
            qty: 6930116,
            price: 7022117.758577891,
          },
        },
        mechanic: { create: { person_id: 7114457, name: 'String' } },
        service: {
          create: {
            created_by: 3336853,
            mechanic: { create: { person_id: 1301120, name: 'String' } },
            schedule: {
              create: {
                booking_date: '2022-03-09T12:31:40Z',
                customer: {
                  create: {
                    user: {
                      create: {
                        name: 'String',
                        password: 'String',
                        email: 'String3040981',
                        user_type: 'String',
                      },
                    },
                  },
                },
                vehicle: {
                  create: {
                    name: 'String',
                    serialNum: 'String4739029',
                    year: 9005153,
                    created_by: 5561349,
                    user: {
                      create: {
                        name: 'String',
                        password: 'String',
                        email: 'String9396421',
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
    },
    two: {
      data: {
        parts: {
          create: {
            name: 'String',
            part_number: 7665775,
            qty: 3093816,
            price: 2576952.219749533,
          },
        },
        mechanic: { create: { person_id: 7994371, name: 'String' } },
        service: {
          create: {
            created_by: 8609904,
            mechanic: { create: { person_id: 362685, name: 'String' } },
            schedule: {
              create: {
                booking_date: '2022-03-09T12:31:40Z',
                customer: {
                  create: {
                    user: {
                      create: {
                        name: 'String',
                        password: 'String',
                        email: 'String1718844',
                        user_type: 'String',
                      },
                    },
                  },
                },
                vehicle: {
                  create: {
                    name: 'String',
                    serialNum: 'String5920628',
                    year: 4221154,
                    created_by: 2642434,
                    user: {
                      create: {
                        name: 'String',
                        password: 'String',
                        email: 'String3450602',
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
    },
  },
})

export type StandardScenario = typeof standard
