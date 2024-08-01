"use client";

import {
  Alert,
  AlertIcon,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { deleteLink } from "@/actions";
import { redirect } from "next/navigation";
import NextLink from "next/link";

export default function LinkDetails({
  link,
  index,
}: {
  link: ShortLink;
  index: number;
}) {
  const toast = useToast();
  console.log(link.id);
  return (
    <>
      {index === 0 && <Divider />}
      {link.disabled && (
        <Alert status="error" variant="solid">
          <AlertIcon />
          {link.disabledMessage}
        </Alert>
      )}
      <Flex
        direction={{
          base: "column",
          lg: "row",
        }}
        alignItems="start"
        justifyContent="space-between"
        width="100%"
        gap={2}
      >
        <Flex direction="column" gap={2}>
          <Link as={NextLink} href={`https://riskycase.in/${link.shortCode}`}>
            <Text fontSize="large">riskycase.in/{link.shortCode}</Text>
            <Text>{link.longLink}</Text>
          </Link>
          <Text>Clicks: {link.redirectCount}</Text>
        </Flex>
        <ButtonGroup isDisabled={link.disabled}>
          <Button as={NextLink} href={`/dashboard/edit/${link.shortCode}`}>
            Edit
          </Button>
          <Button
            colorScheme="red"
            onClick={async function () {
              const result = await deleteLink(link.shortCode);
              if (result._formError) {
                toast({ title: result._form, status: "error" });
              } else {
                toast({
                  title: "Link successfully deleted",
                  status: "success",
                });
                redirect("/dashboard");
              }
            }}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Flex>
      <Divider />
    </>
  );
}
