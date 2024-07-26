import { useLink } from "@/actions";

export async function GET(
  _: Request,
  { params: { shortCode } }: { params: { shortCode: string } }
) {
  const link = await useLink(shortCode);
  if (link) {
    const {
      id,
      userId,
      createdAt,
      updatedAt,
      disabled,
      disabledMessage,
      ...publicLink
    } = link;
    return Response.json(publicLink);
  } else {
    return Response.json({
      shortCode,
      longLink: "",
      redirectCount: 0,
    });
  }
}
