"use client";

import { editUser } from "@/actions";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, User } from "@prisma/client";
import { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import LinkDetail from "./linkDetail";

export default function UserDetail({
  user,
}: {
  user: User & { Links: Link[] };
}) {
  const { isOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const [isLoading, setLoading] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [limit, setLimit] = useState(user.linkLimit);
  return (
    <>
      <Flex direction="row" gap={2}>
        <Avatar src={user.image!} name={user.name!} />
        <Flex direction="column" flex={1}>
          <Text fontSize="large">{user.name}</Text>
          <Text fontSize="small">{user.email}</Text>
          <Text fontSize="small">
            {user.Links.length} / {user.linkLimit} links used
          </Text>
        </Flex>
        <Button variant="text" onClick={openModal}>
          EDIT
        </Button>
      </Flex>
      {user.Links.length !== 0 && (
        <>
          <Button
            variant="text"
            alignSelf="start"
            rightIcon={showLinks ? <MdArrowDropUp /> : <MdArrowDropDown />}
            onClick={() => setShowLinks(!showLinks)}
          >
            {showLinks ? "HIDE" : "SHOW"} LINKS
          </Button>
          {showLinks && (
            <Flex direction="column" gap={4} padding={2}>
              {user.Links.map((link, index) => (
                <LinkDetail link={link} key={index} />
              ))}
            </Flex>
          )}
        </>
      )}
      <Divider />
      <Modal
        isOpen={isOpen}
        isCentered
        onClose={() => {
          setLimit(user.linkLimit);
          closeModal();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Link limit</FormLabel>
              <NumberInput
                min={user.Links.length}
                defaultValue={limit}
                onChange={(_, number) => setLimit(number)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              isLoading={isLoading}
              onClick={async () => {
                setLoading(true);
                await editUser(user.id, limit);
                setLoading(false);
                closeModal();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
