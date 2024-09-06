"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { redirect } from "next/navigation";

export async function getAllUsers() {
  const user = await auth();
  if (!user || !user.user) {
    return {
      _form: "You are not admin!",
      _formError: "UNAUTHORISED",
    };
  } else {
    const dbUser = await db.user.findFirst({ where: { id: user.user.id } });
    if (dbUser && dbUser.level !== "ADMIN") {
      return {
        _form: "You are not admin!",
        _formError: "UNAUTHORISED",
      };
    }
  }
  return db.user.findMany({
    include: {
      Links: true,
    },
  });
}

export async function editUser(id: string, linkLimit: number) {
  const user = await auth();
  if (!user || !user.user) {
    return {
      _form: "You are not admin!",
      _formError: "UNAUTHORISED",
    };
  } else {
    const dbUser = await db.user.findFirst({ where: { id: user.user.id } });
    if (dbUser && dbUser.level !== "ADMIN") {
      return {
        _form: "You are not admin!",
        _formError: "UNAUTHORISED",
      };
    }
  }
  const editUser = await db.user.findFirst({ where: { id } });
  if (!editUser) return -1;
  const newUser = await db.user.update({
    where: { id },
    data: { linkLimit },
  });
  newUser.linkLimit;
  redirect("/admin/dashboard");
}

export async function getAllLinks() {
  const user = await auth();
  if (!user || !user.user) {
    return {
      _form: "You are not admin!",
      _formError: "UNAUTHORISED",
    };
  } else {
    const dbUser = await db.user.findFirst({ where: { id: user.user.id } });
    if (dbUser && dbUser.level !== "ADMIN") {
      return {
        _form: "You are not admin!",
        _formError: "UNAUTHORISED",
      };
    }
  }
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
  const user = await auth();
  if (!user || !user.user) {
    return {
      _form: "You are not admin!",
      _formError: "UNAUTHORISED",
    };
  } else {
    const dbUser = await db.user.findFirst({ where: { id: user.user.id } });
    if (dbUser && dbUser.level !== "ADMIN") {
      return {
        _form: "You are not admin!",
        _formError: "UNAUTHORISED",
      };
    }
  }
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
  const user = await auth();
  if (!user || !user.user) {
    return {
      _form: "You are not admin!",
      _formError: "UNAUTHORISED",
    };
  } else {
    const dbUser = await db.user.findFirst({ where: { id: user.user.id } });
    if (dbUser && dbUser.level !== "ADMIN") {
      return {
        _form: "You are not admin!",
        _formError: "UNAUTHORISED",
      };
    }
  }
  await db.report.deleteMany({
    where: { linkId: shortCode },
  });
  redirect("/admin/dashboard");
}
