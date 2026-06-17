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

  await seedInventory()

  console.log('Seed complete.')
  console.log('Test accounts:')
  console.log('  superadmin@lgu.gov.ph / super123')
  console.log('  admin@lgu.gov.ph / admin123')
  console.log('  tech@lgu.gov.ph / tech123')
  console.log('  user@lgu.gov.ph / user123')
  console.log('No poles seeded — to be populated via OSM streetlight import.')
}

async function seedInventory() {
  const existing = await prisma.inventoryItem.count()
  if (existing > 0) return

  const items = [
    { name: 'LED Streetlight Bulb 50W', sku: 'BULB-LED-50W', description: 'Standard 50W LED bulb for streetlight fixtures', quantity: 50, minStock: 10, unit: 'pcs' },
    { name: 'LED Streetlight Bulb 100W', sku: 'BULB-LED-100W', description: 'High-output 100W LED bulb for main roads', quantity: 30, minStock: 5, unit: 'pcs' },
    { name: 'Photocell Sensor', sku: 'SENSOR-PC', description: 'Automatic dusk-to-dawn photocell sensor', quantity: 25, minStock: 5, unit: 'pcs' },
    { name: 'Capacitor 25uF', sku: 'CAP-25UF', description: '25 microfarad capacitor for HPS fixtures', quantity: 40, minStock: 10, unit: 'pcs' },
    { name: 'Fuse 10A', sku: 'FUSE-10A', description: '10-amp cartridge fuse', quantity: 100, minStock: 20, unit: 'pcs' },
    { name: 'Ballast 150W', sku: 'BALLAST-150W', description: '150W magnetic ballast for HPS lamps', quantity: 15, minStock: 3, unit: 'pcs' },
    { name: 'Copper Wire #14 THHN', sku: 'WIRE-14-THHN', description: '#14 AWG THHN solid copper wire (per meter)', quantity: 500, minStock: 100, unit: 'm' },
    { name: 'Electrical Tape', sku: 'TAPE-ELEC', description: '3M super 33+ electrical tape (per roll)', quantity: 20, minStock: 5, unit: 'rolls' },
    { name: 'Wire Connector (Wire Nut)', sku: 'CONN-WN', description: 'Assorted wire nut connectors (bag of 50)', quantity: 200, minStock: 50, unit: 'pcs' },
    { name: 'Pole Anchor Bolt Kit', sku: 'ANCHOR-BOLT', description: 'Galvanized anchor bolt kit for pole installation', quantity: 10, minStock: 2, unit: 'sets' },
  ]

  for (const item of items) {
    await prisma.inventoryItem.create({ data: item })
  }
  console.log(`Seeded ${items.length} inventory items.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })