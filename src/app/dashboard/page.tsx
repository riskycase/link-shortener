import { getUserLinks, getUser } from "@/actions";
import LinkDetails from "@/components/dashboard/LinkDetails";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default async function Dashboard() {
  const [user, links] = await Promise.all([getUser(), getUserLinks()]);
  return user ? (
    <Flex direction="column" padding={4} width="100%" gap={4} flex={1}>
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Heading>Dashboard</Heading>
        <Button
          as={Link}
          colorScheme="green"
          href="/dashboard/new"
          isDisabled={user!.linkLimit <= links.length}
          rightIcon={<FaPlus />}
        >
          New
        </Button>
      </Flex>
      {user!.linkLimit <= links.length && (
        <Alert status="warning" variant="solid">
          <AlertIcon />
          You have reached the maximum number of links for this account!
        </Alert>
      )}
      <Text>
        Using {links.length} link{links.length === 1 ? "" : "s"} out of{" "}
        {user!.linkLimit}
      </Text>
      {links.map((link, index) => (
        <LinkDetails link={link} index={index} key={index} />
      ))}
    </Flex>
  ) : (
    <Flex direction="column" padding={4} width="100%" gap={4}>
      <Heading>Dashboard</Heading>
      <Text>You must be signed in to shorten links!</Text>
    </Flex>
  );
}
