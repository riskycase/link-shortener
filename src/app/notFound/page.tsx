import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import graphic from "@/../public/undraw_access_denied_re_awnf.svg";

export default function Home() {
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      className="h-full"
      alignItems="center"
      justifyItems="center"
      flex={1}
      padding={{ base: 1, lg: 4 }}
    >
      <Image
        src={graphic}
        width={480}
        style={{
          maxWidth: "85vw",
        }}
        alt="Not found graphic"
      />
      <Flex direction="column" gap={4}>
        <Heading>Not found!</Heading>
        <Text>The link you are trying to access does not exist!</Text>
      </Flex>
    </SimpleGrid>
  );
}
