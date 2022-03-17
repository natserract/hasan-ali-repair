import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PartUsedCreateArgs>({
  partUsed: {
    one: {
      data: {
        parts: {
          create: {
            name: 'String',
            part_number: 6986896,
            qty: 282653,
            price: 5056331.305822717,
          },
        },
        mechanic: { create: { person_id: 'String974504', name: 'String' } },
        service: {
          create: {
            created_by: 443621,
            mechanic: {
              create: { person_id: 'String4055974', name: 'String' },
            },
            schedule: {
              create: {
                booking_date: '2022-03-17T02:39:41Z',
                customer: {
                  create: {
                    user: {
                      create: {
                        name: 'String',
                        password: 'String',
                        email: 'String8364375',
                        user_type: 'String',
                      },
                    },
                  },
                },
                vehicle: {
                  create: {
                    name: 'String',
                    serialNum: 'String3785375',
                    year: 2584330,
                    created_by: 6065421,
                    user: {
                      create: {
                        name: 'String',
                        password: 'String',
                        email: 'String6739596',
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
            part_number: 5348325,
            qty: 3847275,
            price: 24514.4357842042,
          },
        },
        mechanic: { create: { person_id: 'String7245801', name: 'String' } },
        service: {
          create: {
            created_by: 2542539,
            mechanic: {
              create: { person_id: 'String2499837', name: 'String' },
            },
            schedule: {
              create: {
                booking_date: '2022-03-17T02:39:41Z',
                customer: {
                  create: {
                    user: {
                      create: {
                        name: 'String',
                        password: 'String',
                        email: 'String5576618',
                        user_type: 'String',
                      },
                    },
                  },
                },
                vehicle: {
                  create: {
                    name: 'String',
                    serialNum: 'String9820484',
                    year: 3962390,
                    created_by: 9718880,
                    user: {
                      create: {
                        name: 'String',
                        password: 'String',
                        email: 'String868970',
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
