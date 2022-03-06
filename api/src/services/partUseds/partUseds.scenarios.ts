import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PartUsedCreateArgs>({
  partUsed: {
    one: {
      data: {
        parts: {
          create: {
            name: 'String',
            part_number: 5451430,
            qty: 4142205,
            price: 4246401.237351945,
          },
        },
        mechanic: { create: { person_id: 1533419, name: 'String' } },
        service: {
          create: {
            created_by: 9195111,
            vehicle: {
              create: {
                name: 'String',
                serialNum: 'String2451690',
                year: 587671,
                created_by: 4765295,
              },
            },
            mechanic: { create: { person_id: 2143035, name: 'String' } },
            customer: {
              create: {
                user: {
                  create: {
                    name: 'String',
                    password: 'String',
                    email: 'String1003225',
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
        parts: {
          create: {
            name: 'String',
            part_number: 7850940,
            qty: 6614938,
            price: 5778340.240274003,
          },
        },
        mechanic: { create: { person_id: 1302267, name: 'String' } },
        service: {
          create: {
            created_by: 8563393,
            vehicle: {
              create: {
                name: 'String',
                serialNum: 'String7922689',
                year: 2544135,
                created_by: 5193395,
              },
            },
            mechanic: { create: { person_id: 8460263, name: 'String' } },
            customer: {
              create: {
                user: {
                  create: {
                    name: 'String',
                    password: 'String',
                    email: 'String727262',
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
