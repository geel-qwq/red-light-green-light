import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import {
  getDashboardData,
  getUserFloatingDashboardData,
  getTechnicianFloatingDashboardData,
  getSuperAdminFloatingDashboardData,
} from '@/app/(dashboard)/dashboard/_components/getDashboardData'

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await getDashboardData(session.user.role, session.user.id)

  if (session.user.role === 'SUPERADMIN') {
    const superadminDashboard = await getSuperAdminFloatingDashboardData()
    return NextResponse.json({
      ...data,
      superadminDashboard,
      userName: session.user.name ?? 'Super Admin',
    })
  }

  if (session.user.role === 'USER') {
    const userDashboard = await getUserFloatingDashboardData(session.user.id)
    return NextResponse.json({
      ...data,
      userDashboard,
      userName: session.user.name ?? 'User',
    })
  }

  if (session.user.role === 'TECHNICIAN') {
    const technicianDashboard = await getTechnicianFloatingDashboardData(session.user.id)
    return NextResponse.json({
      ...data,
      technicianDashboard,
      userName: session.user.name ?? 'Technician',
    })
  }

  return NextResponse.json(data)
}