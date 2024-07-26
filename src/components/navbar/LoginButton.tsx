"use client";

import { signIn, signOut } from "@/actions";
import { signOut as nextSignOut, useSession } from "next-auth/react";
import {
  Avatar,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  theme,
} from "@chakra-ui/react";
import { useState } from "react";
import NextLink from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";

export default function Login() {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  if (session.status === "loading") {
    return <Spinner />;
  } else if (session.status === "unauthenticated") {
    return (
      <Button
        isLoading={loading}
        onClick={() => {
          setLoading(true);
          signIn();
        }}
        leftIcon={<FaGoogle />}
      >
        SIGN IN
      </Button>
    );
  } else if (session.status === "authenticated" && session.data.user) {
    return (
      <Flex direction="row" alignItems="center" gap={2}>
        <Link as={NextLink} href="/dashboard">
          DASHBOARD
        </Link>
        <Menu>
          <MenuButton
            as={Avatar}
            name={session.data.user.name!}
            src={session.data.user.image!}
            size="sm"
          />
          <MenuList textColor={theme.colors.gray[700]}>
            <MenuItem
              onClick={() => {
                signOut();
                nextSignOut({ redirect: false });
              }}
              icon={<FaSignOutAlt />}
            >
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  }
}
