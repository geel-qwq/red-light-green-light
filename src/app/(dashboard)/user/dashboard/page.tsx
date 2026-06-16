import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import UserStatsRow from './_components/UserStatsRow'
import MyReportsTable from './_components/MyReportsTable'
import MyRecentActivity from './_components/MyRecentActivity'

async function getUserData(userId: string) {
  const [myReports, openReports, resolvedReports, recentReports, recentActivity] = await Promise.all([
    prisma.faultReport.count({ where: { reportedById: userId } }),
    prisma.faultReport.count({ where: { reportedById: userId, status: { in: ['OPEN', 'IN_PROGRESS'] } } }),
    prisma.faultReport.count({ where: { reportedById: userId, status: { in: ['RESOLVED', 'CLOSED'] } } }),
    prisma.faultReport.findMany({
      where: { reportedById: userId },
      orderBy: { reportedAt: 'desc' },
      take: 10,
      include: {
        pole: { select: { poleCode: true, address: true, barangay: true } },
        workOrder: { select: { status: true, assignedTo: { select: { firstName: true, lastName: true } } } },
      },
    }),
    prisma.faultReport.findMany({
      where: { reportedById: userId },
      orderBy: { reportedAt: 'desc' },
      take: 5,
      include: { pole: { select: { poleCode: true, address: true } } },
    }),
  ])

  return { myReports, openReports, resolvedReports, recentReports, recentActivity }
}

export default async function UserDashboardPage() {
  const session = await getSession()
  if (!session) redirect('/login')
  if (session.user.role !== 'USER') redirect('/dashboard')

  const data = await getUserData(session.user.id)
  const firstName = session.user.name?.split(' ')[0] ?? 'there'

  return (
    <div className="p-8 space-y-8 max-w-[1200px]">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hi, {firstName} 👋</h1>
        <p className="text-sm text-gray-500 mt-1">
          Here's a summary of your reported issues and their current status.
        </p>
      </div>

      {/* Stats Row */}
      <UserStatsRow
        total={data.myReports}
        open={data.openReports}
        resolved={data.resolvedReports}
      />

      {/* Two-column: recent activity + report a new issue CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MyReportsTable reports={data.recentReports} />
        </div>
        <MyRecentActivity activity={data.recentActivity} />
      </div>
    </div>
  )
}