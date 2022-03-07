import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PartUsedCreateArgs>({
  partUsed: {
    one: {
      data: {
        used_qty: 4542497,
        parts: {
          create: {
            name: 'String',
            part_number: 2097671,
            qty: 1765497,
            price: 1527658.4703279394,
          },
        },
        mechanic: { create: { person_id: 7818975, name: 'String' } },
        service: {
          create: {
            created_by: 641823,
            mechanic: { create: { person_id: 2711026, name: 'String' } },
            schedule: {
              create: {
                booking_date: '2022-03-07T05:48:31Z',
                customer: {
                  create: {
                    user: {
                      create: {
                        name: 'String',
                        password: 'String',
                        email: 'String1636713',
                        user_type: 'String',
                      },
                    },
                  },
                },
                vehicle: {
                  create: {
                    name: 'String',
                    serialNum: 'String3334700',
                    year: 2155615,
                    created_by: 9136183,
                    user: {
                      create: {
                        name: 'String',
                        password: 'String',
                        email: 'String6152196',
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
        used_qty: 768344,
        parts: {
          create: {
            name: 'String',
            part_number: 8644121,
            qty: 1361096,
            price: 7382737.805214965,
          },
        },
        mechanic: { create: { person_id: 6404416, name: 'String' } },
        service: {
          create: {
            created_by: 2386987,
            mechanic: { create: { person_id: 5932075, name: 'String' } },
            schedule: {
              create: {
                booking_date: '2022-03-07T05:48:31Z',
                customer: {
                  create: {
                    user: {
                      create: {
                        name: 'String',
                        password: 'String',
                        email: 'String4999320',
                        user_type: 'String',
                      },
                    },
                  },
                },
                vehicle: {
                  create: {
                    name: 'String',
                    serialNum: 'String1020519',
                    year: 5857283,
                    created_by: 6337665,
                    user: {
                      create: {
                        name: 'String',
                        password: 'String',
                        email: 'String8037132',
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
