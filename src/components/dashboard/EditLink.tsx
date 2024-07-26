"use client";

import { editLink } from "@/actions";
import {
  Flex,
  Heading,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  FormErrorMessage,
  Show,
  Hide,
  Button,
  AlertIcon,
  Alert,
} from "@chakra-ui/react";
import { useFormState } from "react-dom";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

export default function EditLink({ link }: { link: ShortLink }) {
  const [formState, action, loading] = useFormState<
    ShortLinkFormMessage,
    FormData
  >(editLink, {});
  return (
    <form action={action} style={{ width: "100%" }}>
      <Flex
        direction="column"
        alignItems="start"
        gap={4}
        width="100%"
        padding={4}
      >
        <Heading>New Link</Heading>
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
          <FormControl isInvalid={Array.isArray(formState.shortCode)}>
            <InputGroup variant="flushed">
              <InputLeftAddon>riskycase.in/</InputLeftAddon>
              <Input name="shortCode" value={link.shortCode} readOnly />
            </InputGroup>
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
              placeholder={link.longLink}
            />
            {Array.isArray(formState.longLink) &&
              formState.longLink.map((error, index) => (
                <FormErrorMessage key={index}>{error}</FormErrorMessage>
              ))}
          </FormControl>
        </Flex>
        <Button
          type="submit"
          colorScheme="green"
          isLoading={loading}
          isDisabled={link.disabled}
        >
          Update
        </Button>
      </Flex>
    </form>
  );
}
