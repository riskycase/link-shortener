import { getAllLinks, getAllUsers, getUser } from "@/actions";
import LinkList from "@/components/admin/link/linkList";
import UserList from "@/components/admin/user/userList";
import {
  Badge,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const user = await getUser();
  if (user?.level !== "ADMIN") {
    redirect("/");
  }
  const [users, links] = await Promise.all([getAllUsers(), getAllLinks()]);
  if (!(Array.isArray(users) && Array.isArray(links))) redirect("/");
  else
    return (
      <Flex direction="column" padding={4} gap={4} flex={1}>
        <Heading>Admin Dashboard</Heading>
        <Tabs isFitted>
          <TabList>
            <Tab>
              <Text marginX={2}>Users</Text>
              <Badge>{users.length}</Badge>
            </Tab>
            <Tab>
              <Text marginX={2}>Links</Text>
              <Badge>{links.length}</Badge>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UserList users={users} />
            </TabPanel>
            <TabPanel>
              <LinkList links={links} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    );
}
