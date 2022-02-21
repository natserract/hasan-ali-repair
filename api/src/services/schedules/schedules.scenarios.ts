import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ScheduleCreateArgs>({
  schedule: {
    one: {
      data: {
        time_from: '2022-02-21T06:11:20Z',
        time_to: '2022-02-21T06:11:20Z',
        service: {
          create: {
            created_by: 4265813,
            updated_by: 3183561,
            vehicle: {
              create: {
                serialNum: 3032772,
                year: 8736506,
                created_by: 7079624,
                updated_by: 5892526,
              },
            },
            mechanic: { create: { person_id: 7689662, name: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        time_from: '2022-02-21T06:11:20Z',
        time_to: '2022-02-21T06:11:20Z',
        service: {
          create: {
            created_by: 9215914,
            updated_by: 2841053,
            vehicle: {
              create: {
                serialNum: 4497224,
                year: 99204,
                created_by: 5698808,
                updated_by: 5669191,
              },
            },
            mechanic: { create: { person_id: 3766188, name: 'String' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
