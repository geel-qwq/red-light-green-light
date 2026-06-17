"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import type { SearchHistory } from "@/lib/generated/prisma";

export async function getSearchHistory(): Promise<SearchHistory[]> {
  const session = await getSession();
  const userId = session?.user?.id;
  if (!userId) return [];

  return prisma.searchHistory.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
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
