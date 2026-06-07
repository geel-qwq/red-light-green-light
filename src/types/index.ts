import { Pole, FaultReport, WorkOrder, User, StatusLog } from '@prisma/client'

// Re-export Prisma types for convenience
export type { Pole, FaultReport, WorkOrder, User, StatusLog }

// Pole with fault reports count — used in list views
export type PoleWithStats = Pole & {
  _count: { faultReports: number }
}

// Fault report with related pole and reporter
export type FaultReportWithRelations = FaultReport & {
  pole: Pole
  reportedBy: Pick<User, 'id' | 'name'>
  workOrder: WorkOrder | null
}

// Work order with all relations
export type WorkOrderWithRelations = WorkOrder & {
  faultReport: FaultReport & { pole: Pole }
  assignedTo: Pick<User, 'id' | 'name'> | null
  assignedBy: Pick<User, 'id' | 'name'>
}

// Status log with user info
export type StatusLogWithUser = StatusLog & {
  changedBy: Pick<User, 'id' | 'name'>
}

// Dashboard stats shape
export type DashboardStats = {
  totalPoles: number
  activePoles: number
  faultyPoles: number
  underMaintenancePoles: number
  openFaults: number
  avgResolutionHours: number | null
}
