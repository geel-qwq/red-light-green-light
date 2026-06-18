import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function logAudit(
  action: string,
  entityType: string,
  entityId?: string,
  metadata?: string,
) {
  try {
    const session = await getSession()
    if (!session?.user?.id) return
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        userEmail: session.user.email ?? '',
        userName: session.user.name ?? session.user.email ?? 'Unknown',
        role: session.user.role ?? 'UNKNOWN',
        action,
        entityType,
        entityId,
        metadata,
      },
    })
  } catch {
    // Silently fail — audit logging should never block the main operation
  }
}
