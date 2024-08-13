"use server";

import { getLink, getUser } from "@/actions";
import { baseUrl } from "@/url";
import {
  Divider,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import graphic from "@/../public/undraw_access_denied_re_awnf.svg";
import NextLink from "next/link";
import ReportForm from "@/components/report/reportForm";

export default async function ReportLink({
  params: { shortCode },
}: {
  params: { shortCode: string };
}) {
  const [user, link] = await Promise.all([getUser(), getLink(shortCode)]);
  if (!link)
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
          <Text>The link you are trying to report does not exist!</Text>
        </Flex>
      </SimpleGrid>
    );
  else
    return (
      <Flex direction="column" padding={4} width="100%" gap={4} flex={1}>
        <Heading>Report Link</Heading>
        <Flex direction="column" gap={2}>
          <Text>
            The link{" "}
            <Link
              as={NextLink}
              href={`${baseUrl.origin}/${link.shortCode}`}
              wordBreak="break-all"
            >
              {baseUrl.hostname}/{shortCode}
            </Link>{" "}
            redirects to
          </Text>
          <Link as={NextLink} href={link.longLink} wordBreak="break-all">
            {link.longLink}
          </Link>{" "}
          {user ? (
            <>
              <Divider />
              <ReportForm user={user} link={link} />
            </>
          ) : (
            <Text>You need to be signed in to report this link!</Text>
          )}
        </Flex>
      </Flex>
    );
}
