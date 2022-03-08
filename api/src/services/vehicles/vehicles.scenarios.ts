import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.VehicleCreateArgs>({
  vehicle: {
    one: {
      data: {
        name: 'String',
        serialNum: 'String8106195',
        year: 7625319,
        created_by: 9121395,
        user: {
          create: {
            name: 'String',
            password: 'String',
            email: 'String6933840',
            user_type: 'String',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        serialNum: 'String2688195',
        year: 3384239,
        created_by: 9894374,
        user: {
          create: {
            name: 'String',
            password: 'String',
            email: 'String1130310',
            user_type: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
