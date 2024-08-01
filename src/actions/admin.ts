"use server";

import { db } from "@/db";

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
  return newUser.linkLimit;
}

export async function getAllLinks() {
  return db.link.findMany({
    include: {
      Report: true,
    },
  });
}

export async function getAllReports() {
  return db.report.findMany({
    include: {
      Link: true,
    },
  });
}
