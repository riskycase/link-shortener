"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function getAllUsers() {
  return db.user.findMany({
    include: {
      Links: true,
    },
  });
}

export async function editUser(id: string, linkLimit: number) {
  const user = await db.user.findFirst({ where: { id } });
  if (!user) return -1;
  const newUser = await db.user.update({ where: { id }, data: { linkLimit } });
  newUser.linkLimit;
  redirect("/admin/dashboard");
}

export async function getAllLinks() {
  return db.link.findMany({
    include: {
      User: true,
      Report: true,
    },
    orderBy: {
      Report: {
        _count: "desc",
      },
    },
  });
}

export async function modifyLink(
  shortCode: string,
  disabledMessage: string,
  disabled: boolean
) {
  const link = await db.link.findFirst({
    where: { id: shortCode.toLowerCase() },
  });
  if (!link) return {};
  await db.link.update({
    where: { id: shortCode.toLowerCase() },
    data: { disabled, disabledMessage },
  });
  redirect("/admin/dashboard");
}

export async function deleteReports(shortCode: string) {
  await db.report.deleteMany({
    where: { linkId: shortCode },
  });
  redirect("/admin/dashboard");
}
