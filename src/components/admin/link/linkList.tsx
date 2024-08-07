import { Flex, Text } from "@chakra-ui/react";
import { Link, Report, User } from "@prisma/client";
import LinkDetail from "./linkDetail";

export default function LinkList({
  links,
}: {
  links: Array<Link & { User: User; Report: Report[] }>;
}) {
  return (
    <Flex direction="column" gap={4}>
      {links.length === 0 ? (
        <Text>Nothing to show here</Text>
      ) : (
        links.map((link, index) => <LinkDetail link={link} key={index} />)
      )}
    </Flex>
  );
}
