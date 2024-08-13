"use server";

import { db } from "@/db";
import { Report } from "@prisma/client";

export async function reportLink(
  shortCode: string,
  userId: string,
  reportType: Report["type"],
  desc?: string
) {
  await db.report.create({
    data: {
      linkId: shortCode.toLowerCase(),
      userId,
      type: reportType,
      desc,
    },
  });
  return true;
}
