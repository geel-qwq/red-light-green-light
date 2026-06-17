"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
  const session = await getSession();
  if (!session?.user?.id) return [];

  return prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export async function getUnreadCount() {
  const session = await getSession();
  if (!session?.user?.id) return 0;

  return prisma.notification.count({
    where: { userId: session.user.id, read: false },
  });
}

export async function markNotificationRead(id: string) {
  const session = await getSession();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.notification.updateMany({
    where: { id, userId: session.user.id },
    data: { read: true },
  });
}

export async function markAllNotificationsRead() {
  const session = await getSession();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.notification.updateMany({
    where: { userId: session.user.id, read: false },
    data: { read: true },
  });

  revalidatePath("/");
}

export async function createNotification(data: {
  userId: string;
  title: string;
  message: string;
  type?: string;
}) {
  return prisma.notification.create({
    data: {
      userId: data.userId,
      title: data.title,
      message: data.message,
      type: data.type ?? "INFO",
    },
  });
}
