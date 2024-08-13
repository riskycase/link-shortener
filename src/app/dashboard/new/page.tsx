"use client";

import { createLink } from "@/actions";
import { baseUrl } from "@/url";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Hide,
  Input,
  InputGroup,
  InputLeftAddon,
  Show,
} from "@chakra-ui/react";
import { useFormState } from "react-dom";
import { FaArrowDown, FaArrowRightLong } from "react-icons/fa6";

export default function NewLink() {
  const [formState, action, loading] = useFormState<
    ShortLinkFormMessage,
    FormData
  >(createLink, {});
  return (
    <form action={action} style={{ width: "100%", flex: 1 }}>
      <Flex
        direction="column"
        alignItems="start"
        gap={4}
        width="100%"
        padding={4}
      >
        <Heading>New Link</Heading>
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
          <FormControl isInvalid={Array.isArray(formState.shortCode)}>
            <InputGroup variant="flushed">
              <InputLeftAddon>{baseUrl.hostname}/</InputLeftAddon>
              <Input name="shortCode" />
            </InputGroup>
            {Array.isArray(formState.shortCode) &&
              formState.shortCode.map((error, index) => (
                <FormErrorMessage key={index}>{error}</FormErrorMessage>
              ))}
          </FormControl>
          <Show above="lg">
            <FaArrowRightLong size={80} />
          </Show>
          <Hide above="lg">
            <FaArrowDown size={24} />
          </Hide>
          <FormControl isInvalid={Array.isArray(formState.longLink)}>
            <Input
              name="longLink"
              type="url"
              variant="flushed"
              placeholder="https://www.google.com"
            />
            {Array.isArray(formState.longLink) &&
              formState.longLink.map((error, index) => (
                <FormErrorMessage key={index}>{error}</FormErrorMessage>
              ))}
          </FormControl>
        </Flex>
        <Button type="submit" colorScheme="green" isLoading={loading}>
          Shorten
        </Button>
      </Flex>
    </form>
  );
}
