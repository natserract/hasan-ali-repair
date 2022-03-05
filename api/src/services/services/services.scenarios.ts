import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ServiceCreateArgs>({
  service: {
    one: {
      data: {
        created_by: 7491604,
        vehicle: {
          create: {
            name: 'String',
            serialNum: 'String7952465',
            year: 5073388,
            created_by: 9372112,
          },
        },
        mechanic: { create: { person_id: 9618031, name: 'String' } },
        customer: {
          create: {
            user: {
              create: {
                name: 'String',
                password: 'String',
                email: 'String2394194',
                user_type: 'String',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        created_by: 4100124,
        vehicle: {
          create: {
            name: 'String',
            serialNum: 'String2758296',
            year: 5332100,
            created_by: 3577354,
          },
        },
        mechanic: { create: { person_id: 1924737, name: 'String' } },
        customer: {
          create: {
            user: {
              create: {
                name: 'String',
                password: 'String',
                email: 'String2390010',
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
