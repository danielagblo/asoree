import { PrismaClient } from '@prisma/client'
import { env } from './env'

function buildDatabaseUrl(): string {
  const url = new URL(env.databaseUrl)
  url.searchParams.set('connection_limit', '20')
  url.searchParams.set('pool_timeout', '30')
  return url.toString()
}

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: buildDatabaseUrl(),
    },
  },
  log: ['error'],
})
