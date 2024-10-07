"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const shortLinkSchema = z.object({
  shortCode: z
    .string()
    .regex(
      /^[a-zA-Z0-9-.]*$/,
      "Message can only contain alphanumberic characters and special characters - and ."
    )
    .min(4, "Short code must be at least 4 characters long"),
  longLink: z.string().url("Must redirect to a valid URL"),
});

export async function createLink(
  message: ShortLinkFormMessage,
  formData: FormData
): Promise<ShortLinkFormMessage> {
  const user = await auth();
  if (!user || !user.user) {
    return {
      _form: "Please sign in!",
      _formError: "UNAUTHENTICATED",
    };
  }
  const parseResult = shortLinkSchema.safeParse({
    shortCode: formData.get("shortCode"),
    longLink: formData.get("longLink"),
  });
  if (parseResult.success) {
    const [existingLink, currentUser, links] = await Promise.all([
      db.link.findFirst({
        where: {
          id: parseResult.data.shortCode.toLowerCase(),
        },
      }),
      db.user.findFirst({ where: { id: user.user.id!! } }),
      db.link.findMany({ where: { userId: user.user.id!! } }),
    ]);
    if (existingLink !== null) {
      return {
        shortCode: ["This link already exists!"],
      };
    }
    if (links.length >= currentUser!.linkLimit) {
      return {
        shortCode: [
          "You have reached the maximum number of links you can create!",
        ],
      };
    }
    await db.link.create({
      data: {
        ...parseResult.data,
        id: parseResult.data.shortCode.toLowerCase(),
        userId: user.user.id!!,
      },
    });
    redirect("/dashboard");
  } else {
    return parseResult.error.flatten().fieldErrors;
  }
}

export async function editLink(
  message: ShortLinkFormMessage,
  formData: FormData
): Promise<ShortLinkFormMessage> {
  const user = await auth();
  if (!user || !user.user) {
    return {
      _form: "Please sign in!",
      _formError: "UNAUTHENTICATED",
    };
  }
  const parseResult = shortLinkSchema.safeParse({
    shortCode: formData.get("shortCode"),
    longLink: formData.get("longLink"),
  });
  if (parseResult.success) {
    const existingLink = await db.link.findFirst({
      where: {
        id: parseResult.data.shortCode.toLowerCase(),
      },
    });
    if (existingLink === null) {
      return {
        shortCode: ["This link does not exist!"],
      };
    } else {
      if (existingLink.userId !== user.user.id) {
        return {
          _form: "This link does not belong to you!",
          _formError: "UNAUTHENTICATED",
        };
      }
      if (existingLink.disabled) {
        return {
          _form: "You cannot edit this link!",
          _formError: "UNAUTHENTICATED",
        };
      }
      await db.link.update({
        where: {
          id: parseResult.data.shortCode.toLowerCase(),
        },
        data: {
          redirectCount: 0,
          longLink: parseResult.data.longLink,
        },
      });
      revalidatePath("/dashboard");
      redirect("/dashboard");
    }
  } else {
    return parseResult.error.flatten().fieldErrors;
  }
}

export async function deleteLink(shortCode: string) {
  const user = await auth();
  if (!user || !user.user) {
    return {
      _form: "Please sign in!",
      _formError: "UNAUTHENTICATED",
    };
  }
  const existingLink = await db.link.findFirst({
    where: { id: shortCode.toLowerCase() },
  });
  if (existingLink === null) {
    return {
      _form: "This link does not exist!",
      _formError: "INVALID",
    };
  } else {
    if (existingLink.userId !== user.user.id) {
      return {
        _form: "This link does not belong to you!",
        _formError: "UNAUTHENTICATED",
      };
    }
    if (existingLink.disabled) {
      return {
        _form: "You cannot delete this link!",
        _formError: "UNAUTHENTICATED",
      };
    }
    await db.link.delete({
      where: { id: shortCode.toLowerCase() },
    });
    revalidatePath("/dashboard");
    return {};
  }
}

export async function getUserLinks() {
  const user = await auth();
  if (!user || !user.user) {
    return [];
  }
  return db.link.findMany({ where: { userId: user.user.id } });
}

export async function getLink(shortCode: string) {
  return db.link.findFirst({ where: { id: shortCode.toLowerCase() } });
}

export async function useLink(shortCode: string) {
  const link = await db.link.findFirst({
    where: { id: shortCode.toLowerCase() },
  });
  if (link === null) {
    return undefined;
  }
  return await db.link.update({
    where: { id: shortCode.toLowerCase() },
    data: {
      redirectCount: {
        increment: 1,
      },
    },
  });
}
