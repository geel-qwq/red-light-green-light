import { Pole, FaultReport, WorkOrder, User, StatusLog } from "@prisma/client";

export type { Pole, FaultReport, WorkOrder, User, StatusLog };

export type PoleWithStats = Pole & {
  _count: { faultReports: number };
};

export type FaultReportWithRelations = FaultReport & {
  pole: Pole;
  reportedBy: Pick<User, "id" | "name">;
  workOrder: WorkOrder | null;
};

export type WorkOrderWithRelations = WorkOrder & {
  faultReport: FaultReport & { pole: Pole };
  assignedTo: Pick<User, "id" | "name"> | null;
  assignedBy: Pick<User, "id" | "name">;
};

export type StatusLogWithUser = StatusLog & {
  changedBy: Pick<User, "id" | "name">;
};

export type DashboardStats = {
  totalPoles: number;
  activePoles: number;
  faultyPoles: number;
  underMaintenancePoles: number;
  openFaults: number;
  avgResolutionHours: number | null;
};
