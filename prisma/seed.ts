// prisma/seed.ts
import { Role, FaultType, PoleStatus } from '../src/lib/generated/prisma'
import prisma from '../src/lib/prisma' // <-- Import your pre-configured instance instead
import bcrypt from 'bcryptjs'

// REMOVE OR COMMENT OUT THIS LINE:
// const prisma = new PrismaClient() 

async function main() {
  // Seed users
  const superadminPassword = await bcrypt.hash('super123', 10)
  const adminPassword = await bcrypt.hash('admin123', 10)
  const techPassword = await bcrypt.hash('tech123', 10)
  const userPassword = await bcrypt.hash('user123', 10)

  const superadmin = await prisma.user.upsert({
    where: { email: 'superadmin@lgu.gov.ph' },
    update: {},
    create: {
      firstName: 'Super',
      lastName: 'Admin',
      email: 'superadmin@lgu.gov.ph',
      passwordHash: superadminPassword,
      role: Role.SUPERADMIN,
      phone: '09161234567',
      region: 'NCR',
      city: 'Quezon City',
      barangay: 'Diliman',
    },
  })

  const admin = await prisma.user.upsert({
    where: { email: 'admin@lgu.gov.ph' },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@lgu.gov.ph',
      passwordHash: adminPassword,
      role: Role.ADMIN,
      phone: '09171234567',
      region: 'NCR',
      city: 'Quezon City',
      barangay: 'Diliman',
    },
  })

  const tech = await prisma.user.upsert({
    where: { email: 'tech@lgu.gov.ph' },
    update: {},
    create: {
      firstName: 'Juan',
      lastName: 'dela Cruz',
      email: 'tech@lgu.gov.ph',
      passwordHash: techPassword,
      role: Role.TECHNICIAN,
      phone: '09181234567',
      region: 'NCR',
      city: 'Quezon City',
      barangay: 'Commonwealth',
    },
  })

  const user = await prisma.user.upsert({
    where: { email: 'user@lgu.gov.ph' },
    update: {},
    create: {
      firstName: 'Maria',
      lastName: 'Santos',
      email: 'user@lgu.gov.ph',
      passwordHash: userPassword,
      role: Role.USER,
      phone: '09191234567',
      region: 'NCR',
      city: 'Quezon City',
      barangay: 'Kamuning',
    },
  })

  console.log('Seed complete.')
  console.log('Test accounts:')
  console.log('  superadmin@lgu.gov.ph / super123')
  console.log('  admin@lgu.gov.ph / admin123')
  console.log('  tech@lgu.gov.ph / tech123')
  console.log('  user@lgu.gov.ph / user123')
  console.log('No poles seeded — to be populated via OSM streetlight import.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })