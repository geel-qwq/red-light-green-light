"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { logAudit } from "@/lib/audit";

export async function getInventory() {
  return prisma.inventoryItem.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { logs: true } } },
  });
}

export async function getInventoryLogs(itemId: string) {
  return prisma.inventoryLog.findMany({
    where: { itemId },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: { user: { select: { firstName: true, lastName: true } } },
  });
}

export async function updateInventoryQuantity(
  itemId: string,
  change: number,
  note?: string
) {
  const session = await getSession();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const item = await prisma.inventoryItem.findUnique({
    where: { id: itemId },
  });
  if (!item) throw new Error("Item not found");

  const newQty = item.quantity + change;
  if (newQty < 0) throw new Error("Insufficient stock");

  await Promise.all([
    prisma.inventoryItem.update({
      where: { id: itemId },
      data: { quantity: newQty },
    }),
    prisma.inventoryLog.create({
      data: {
        itemId,
        userId: session.user.id,
        change,
        note: note ?? null,
      },
    }),
  ]);

  await logAudit('UPDATE_INVENTORY', 'InventoryItem', itemId, JSON.stringify({ change, note, newQty }))

  revalidatePath("/technician/inventory");
  return { ...item, quantity: newQty };
}
