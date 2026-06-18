import { PrismaClient } from "@/lib/generated/prisma/client"; 
import { PrismaPg } from "@prisma/adapter-pg"; 
import pg from "pg"

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined; 
}; 

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000,
  allowExitOnIdle: false,
})

pool.on("error", (err) => {
  console.error("Unexpected pool error:", err)
})

const adapter = new PrismaPg(pool)

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma 