"use client";

import { modifyLink } from "@/actions";
import { baseUrl } from "@/url";
import {
  Alert,
  Avatar,
  AvatarBadge,
  Badge,
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
import { Link, Report, User } from "@prisma/client";
import NextLink from "next/link";
import { useState } from "react";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";

export default function LinkDetail({
  link,
}: {
  link: Link & { User: User; Report: Report[] };
}) {
  const { isOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const [isLoading, setLoading] = useState(false);
  const [showReports, setShowReports] = useState(false);
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
              <Text fontSize="small">Belongs to: {link.User.name}</Text>
            </Flex>
          </Flex>
          <Button onClick={openModal}>
            {isDisabled ? "Enable" : "Disable"}
          </Button>
        </Flex>
        {link.Report.length > 0 && (
          <>
            <Flex alignItems="center" gap={2}>
              <Button
                variant="text"
                alignSelf="start"
                rightIcon={
                  showReports ? <MdArrowDropUp /> : <MdArrowDropDown />
                }
                onClick={() => setShowReports(!showReports)}
              >
                {showReports ? "HIDE" : "SHOW"} REPORTS
              </Button>
              <Badge>{link.Report.length}</Badge>
            </Flex>
            {showReports && (
              <Flex direction="column" gap={4} padding={2}>
                {link.Report.filter((report) => report.type === "SPAM").length >
                  0 && (
                  <Flex alignItems="center" gap={2}>
                    <Text>Spam reports</Text>
                    <Badge>
                      {
                        link.Report.filter((report) => report.type === "SPAM")
                          .length
                      }
                    </Badge>
                  </Flex>
                )}
                {link.Report.filter((report) => report.type === "NSFW").length >
                  0 && (
                  <Flex alignItems="center" gap={2}>
                    <Text>NSFW reports</Text>
                    <Badge>
                      {
                        link.Report.filter((report) => report.type === "NSFW")
                          .length
                      }
                    </Badge>
                  </Flex>
                )}
                {link.Report.filter((report) => report.type === "MISLEADING")
                  .length > 0 && (
                  <Flex alignItems="center" gap={2}>
                    <Text>Misleading target reports</Text>
                    <Badge>
                      {
                        link.Report.filter(
                          (report) => report.type === "MISLEADING"
                        ).length
                      }
                    </Badge>
                  </Flex>
                )}
                {link.Report.filter((report) => report.type === "OTHER")
                  .length > 0 && (
                  <Flex alignItems="start" direction="column" gap={2}>
                    <Flex alignItems="center" gap={2}>
                      <Text>Other reports</Text>
                      <Badge>
                        {
                          link.Report.filter(
                            (report) => report.type === "OTHER"
                          ).length
                        }
                      </Badge>
                    </Flex>
                    {link.Report.filter(
                      (report) => report.type === "OTHER"
                    ).map((report, index) => (
                      <Text key={index}>{report.desc}</Text>
                    ))}
                  </Flex>
                )}
              </Flex>
            )}
          </>
        )}
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
