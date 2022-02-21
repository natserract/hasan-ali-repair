import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CustomerCreateArgs>({
  customer: {
    one: {
      data: {
        user: {
          create: {
            name: 'String',
            password: 'String',
            email: 'String8818460',
            user_type: 'String',
          },
        },
        service: {
          create: {
            created_by: 8906345,
            updated_by: 3784563,
            vehicle: {
              create: {
                serialNum: 5882885,
                year: 9848514,
                created_by: 1230307,
                updated_by: 7494950,
              },
            },
            mechanic: { create: { person_id: 5260248, name: 'String' } },
          },
        },
        schedule: {
          create: {
            time_from: '2022-02-21T06:12:35Z',
            time_to: '2022-02-21T06:12:35Z',
            service: {
              create: {
                created_by: 3615885,
                updated_by: 3196416,
                vehicle: {
                  create: {
                    serialNum: 2085603,
                    year: 5009923,
                    created_by: 9925478,
                    updated_by: 7086299,
                  },
                },
                mechanic: { create: { person_id: 6756005, name: 'String' } },
              },
            },
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
            email: 'String4472375',
            user_type: 'String',
          },
        },
        service: {
          create: {
            created_by: 5347237,
            updated_by: 8088130,
            vehicle: {
              create: {
                serialNum: 6516320,
                year: 6756495,
                created_by: 726799,
                updated_by: 9626784,
              },
            },
            mechanic: { create: { person_id: 7644452, name: 'String' } },
          },
        },
        schedule: {
          create: {
            time_from: '2022-02-21T06:12:35Z',
            time_to: '2022-02-21T06:12:35Z',
            service: {
              create: {
                created_by: 9232753,
                updated_by: 5059831,
                vehicle: {
                  create: {
                    serialNum: 1820935,
                    year: 2648714,
                    created_by: 5829121,
                    updated_by: 8681270,
                  },
                },
                mechanic: { create: { person_id: 9583894, name: 'String' } },
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
