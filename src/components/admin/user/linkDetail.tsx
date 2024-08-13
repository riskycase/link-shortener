"use client";

import { modifyLink } from "@/actions";
import { baseUrl } from "@/url";
import {
  Alert,
  Avatar,
  AvatarBadge,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link as LinkComponent,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  theme,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "@prisma/client";
import NextLink from "next/link";
import { useState } from "react";

export default function LinkDetail({ link }: { link: Link }) {
  const { isOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const [isLoading, setLoading] = useState(false);
  const [isDisabled, setDisabled] = useState(link.disabled);
  const [message, setMessage] = useState(link.disabledMessage || "");
  return (
    <>
      <Flex direction="column" gap={2}>
        {link.disabled && (
          <Alert status="error" variant="solid">
            Disabled: {link.disabledMessage}
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
          <Flex direction="row" gap={2}>
            <Avatar src={`${new URL(link.longLink).origin}/favicon.ico`}>
              <AvatarBadge
                background={theme.colors.gray[700]}
                borderColor={theme.colors.gray[700]}
                fontSize="0.85rem"
                paddingX="0.125rem"
              >
                {link.redirectCount}
              </AvatarBadge>
            </Avatar>
            <Flex direction="column" flex={1}>
              <LinkComponent
                as={NextLink}
                href={`${baseUrl.origin}/${link.shortCode}`}
              >
                <Text fontSize="large">{link.shortCode}</Text>
              </LinkComponent>
              <Text fontSize="small" wordBreak="break-all">
                {link.longLink}
              </Text>
            </Flex>
          </Flex>
          <Button onClick={openModal}>
            {isDisabled ? "Enable" : "Disable"}
          </Button>
        </Flex>
      </Flex>
      <Divider />
      <Modal
        isOpen={isOpen}
        isCentered
        onClose={() => {
          closeModal();
          setDisabled(link.disabled);
          setMessage(link.disabledMessage || "");
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{link.shortCode}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={2}>
              <FormControl display="flex" alignItems="center" gap={2}>
                <FormLabel marginBottom={0}>Disabled</FormLabel>
                <Switch
                  isChecked={isDisabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                />
              </FormControl>
              <FormControl
                gap={2}
                isDisabled={!isDisabled}
                isInvalid={isDisabled && !message}
              >
                <FormLabel>Disabled message</FormLabel>
                <Input
                  value={message || ""}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <FormErrorMessage>
                  Cannot disable link without a message!
                </FormErrorMessage>
              </FormControl>
            </Flex>
            <ModalFooter>
              <Button
                isDisabled={isDisabled && !message}
                isLoading={isLoading}
                onClick={async () => {
                  setLoading(true);
                  await modifyLink(link.shortCode, message, isDisabled);
                  setLoading(false);
                  closeModal();
                }}
              >
                {isDisabled ? "Disable" : "Enable"}
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
