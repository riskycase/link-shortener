import { Box, Flex, Text, theme } from "@chakra-ui/react";
import LoginButton from "./LoginButton";
import { getUser } from "@/actions";
import { Link } from "@chakra-ui/next-js";

export default async function Navbar() {
  const user = await getUser();
  return (
    <header className="w-full sticky top-0 z-10">
      <Box
        width="100%"
        padding={4}
        backgroundColor={theme.colors.gray[700]}
        color={theme.colors.gray[50]}
      >
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Link href="/">
            <Text fontWeight="bold">Home</Text>
          </Link>
          <LoginButton user={user} />
        </Flex>
      </Box>
    </header>
  );
}
