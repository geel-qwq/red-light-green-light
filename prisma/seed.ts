import { PrismaClient, Role, PoleStatus, FaultType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Seed users
  const adminPassword = await bcrypt.hash('admin123', 10)
  const techPassword = await bcrypt.hash('tech123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@lgu.gov.ph' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@lgu.gov.ph',
      passwordHash: adminPassword,
      role: Role.ADMIN,
    },
  })

  const tech = await prisma.user.upsert({
    where: { email: 'tech@lgu.gov.ph' },
    update: {},
    create: {
      name: 'Juan dela Cruz',
      email: 'tech@lgu.gov.ph',
      passwordHash: techPassword,
      role: Role.TECHNICIAN,
    },
  })

  // Seed poles (Quezon City sample locations)
  const polesData = [
    { poleCode: 'QC-001', address: 'Elliptical Rd', barangay: 'Diliman', latitude: 14.6507, longitude: 121.0439, status: PoleStatus.ACTIVE },
    { poleCode: 'QC-002', address: 'Commonwealth Ave', barangay: 'Commonwealth', latitude: 14.6731, longitude: 121.0562, status: PoleStatus.FAULTY },
    { poleCode: 'QC-003', address: 'Quezon Ave', barangay: 'South Triangle', latitude: 14.6390, longitude: 121.0237, status: PoleStatus.ACTIVE },
    { poleCode: 'QC-004', address: 'Aurora Blvd', barangay: 'New Manila', latitude: 14.6195, longitude: 121.0355, status: PoleStatus.UNDER_MAINTENANCE },
    { poleCode: 'QC-005', address: 'Katipunan Ave', barangay: 'Loyola Heights', latitude: 14.6487, longitude: 121.0786, status: PoleStatus.ACTIVE },
    { poleCode: 'QC-006', address: 'E. Rodriguez Sr. Ave', barangay: 'Kamuning', latitude: 14.6283, longitude: 121.0309, status: PoleStatus.ACTIVE },
    { poleCode: 'QC-007', address: 'Mindanao Ave', barangay: 'Tandang Sora', latitude: 14.6942, longitude: 121.0387, status: PoleStatus.FAULTY },
    { poleCode: 'QC-008', address: 'Visayas Ave', barangay: 'Vasra', latitude: 14.6761, longitude: 121.0296, status: PoleStatus.ACTIVE },
  ]

  for (const pole of polesData) {
    await prisma.pole.upsert({
      where: { poleCode: pole.poleCode },
      update: {},
      create: pole,
    })
  }

  // Seed a sample fault report
  const faultyPole = await prisma.pole.findUnique({ where: { poleCode: 'QC-002' } })
  if (faultyPole) {
    const existing = await prisma.faultReport.findFirst({ where: { poleId: faultyPole.id } })
    if (!existing) {
      const report = await prisma.faultReport.create({
        data: {
          poleId: faultyPole.id,
          reportedById: admin.id,
          description: 'Light not turning on at night.',
          faultType: FaultType.NO_POWER,
        },
      })

      await prisma.workOrder.create({
        data: {
          faultReportId: report.id,
          assignedToId: tech.id,
          assignedById: admin.id,
        },
      })

      await prisma.statusLog.create({
        data: {
          poleId: faultyPole.id,
          changedById: admin.id,
          fromStatus: PoleStatus.ACTIVE,
          toStatus: PoleStatus.FAULTY,
          reason: 'Fault reported: Light not turning on at night.',
        },
      })
    }
  }

  console.log('Seed complete.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
