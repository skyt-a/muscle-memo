import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

prisma.$on('query', async (e) => {
  console.log(`${e.query} ${e.params}`)
})
