import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PartUsedCreateArgs>({
  partUsed: {
    one: {
      data: {
        parts: {
          create: {
            part_number: 657917,
            qty: 7553564,
            price: 9805426.436734388,
          },
        },
        mechanic: { create: { person_id: 6757619, name: 'String' } },
        service: {
          create: {
            created_by: 3450617,
            updated_by: 6878255,
            vehicle: {
              create: {
                serialNum: 491101,
                year: 2281180,
                created_by: 2818848,
                updated_by: 6473371,
              },
            },
            mechanic: { create: { person_id: 608836, name: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        parts: {
          create: {
            part_number: 1091778,
            qty: 513690,
            price: 2413791.2740004077,
          },
        },
        mechanic: { create: { person_id: 7709754, name: 'String' } },
        service: {
          create: {
            created_by: 7140409,
            updated_by: 539300,
            vehicle: {
              create: {
                serialNum: 4695473,
                year: 3237235,
                created_by: 4361643,
                updated_by: 4818348,
              },
            },
            mechanic: { create: { person_id: 1251205, name: 'String' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
