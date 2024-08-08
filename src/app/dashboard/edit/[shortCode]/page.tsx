import { getLink, getUser } from "@/actions";
import EditLink from "@/components/dashboard/EditLink";
import { Flex, Heading, Text } from "@chakra-ui/react";

export default async function EditLinkPage({
  params: { shortCode },
}: {
  params: { shortCode: string };
}) {
  const [link, user] = await Promise.all([getLink(shortCode), getUser()]);
  return link && user && link.userId === user.id ? (
    <EditLink link={link} />
  ) : (
    <Flex direction="column" padding={4} width="100%" gap={4} flex={1}>
      <Heading>Dashboard</Heading>
      <Text>You must be signed in to shorten links!</Text>
    </Flex>
  );
}
