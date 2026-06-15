import { Pole, FaultReport, WorkOrder, User, StatusLog } from "@/lib/generated/prisma";

export type { Pole, FaultReport, WorkOrder, User, StatusLog };

export type PoleWithStats = Pole & {
  _count: { faultReports: number };
};

export type FaultReportWithRelations = FaultReport & {
  pole: Pole;
  reportedBy: Pick<User, "id" | "firstName" >;
  workOrder: WorkOrder | null;
};

export type WorkOrderWithRelations = WorkOrder & {
  faultReport: FaultReport & { pole: Pole };
  assignedTo: Pick<User, "id" | "firstName"> | null;
  assignedBy: Pick<User, "id" | "firstName">;
};

export type StatusLogWithUser = StatusLog & {
  changedBy: Pick<User, "id" | "firstName">;
};

export type DashboardStats = {
  totalPoles: number;
  activePoles: number;
  faultyPoles: number;
  underMaintenancePoles: number;
  openFaults: number;
  avgResolutionHours: number | null;
};
