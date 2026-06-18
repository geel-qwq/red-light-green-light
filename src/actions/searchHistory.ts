"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import type { SearchHistory } from "@/lib/generated/prisma";

export async function getSearchHistory(): Promise<SearchHistory[]> {
  try {
    const session = await getSession();
    const userId = session?.user?.id;
    if (!userId) return [];

    return await prisma.searchHistory.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  } catch (error) {
    console.error("getSearchHistory error:", error);
    return [];
  }
}

export async function saveSearch(formData: {
  title: string;
  description: string;
  lat?: number;
  lng?: number;
}) {
  const session = await getSession();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Unauthorized");

  try {
    const record = await prisma.searchHistory.create({
      data: {
        userId,
        title: formData.title,
        description: formData.description,
        lat: formData.lat,
        lng: formData.lng,
      },
    });

    revalidatePath("/");
    return record;
  } catch (err: any) {
    if (err?.code === 'P2003') {
      throw new Error("Session expired — please log out and log back in");
    }
    throw err;
  }
}

export async function deleteSearch(id: string) {
  const session = await getSession();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Unauthorized");

  await prisma.searchHistory.deleteMany({
    where: { id, userId },
  });

  revalidatePath("/");
  return id;
}
