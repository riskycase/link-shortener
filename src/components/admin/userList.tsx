import { Flex, Text } from "@chakra-ui/react";
import { Link, User } from "@prisma/client";
import UserDetail from "./userDetail";

export default function UserList({
  users,
}: {
  users: Array<User & { Links: Link[] }>;
}) {
  return (
    <Flex direction="column" gap={4}>
      {users.length === 0 ? (
        <Text>Nothing to show here</Text>
      ) : (
        users.map((user, index) => <UserDetail user={user} key={index} />)
      )}
    </Flex>
  );
}
