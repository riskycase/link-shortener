"use client";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, Report, User } from "@prisma/client";
import { reportLink } from "@/actions";

export default function ReportForm({ user, link }: { user: User; link: Link }) {
  const [type, setType] = useState<Report["type"]>("OTHER");
  const [reason, setReason] = useState("");
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  return (
    <>
      <FormControl>
        <FormLabel>Report reason</FormLabel>
        <RadioGroup
          value={type}
          onChange={(value) => setType(value as Report["type"])}
        >
          <Stack spacing={2}>
            <Radio value="SPAM">Spam link</Radio>
            <Radio value="NSFW">NSFW target</Radio>
            <Radio value="MISLEADING">Misleading target link</Radio>
            <Radio value="OTHER">Other reason...</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      {type === "OTHER" && (
        <FormControl>
          <FormLabel>Custom reason</FormLabel>
          <Input value={reason} onChange={(e) => setReason(e.target.value)} />
        </FormControl>
      )}
      <Tooltip
        isDisabled={type !== "OTHER" || !!reason}
        label="Enter reason to report link!"
        placement="right"
      >
        <Button
          isDisabled={type === "OTHER" && !reason}
          isLoading={isLoading}
          onClick={async () => {
            setLoading(true);
            const result = await reportLink(
              link.shortCode,
              user.id,
              type,
              reason || undefined
            );
            if (result) {
              toast({ title: "Reported successfully", status: "success" });
            } else {
              toast({ title: "Some error occurred!", status: "error" });
            }
            setLoading(false);
          }}
          alignSelf="start"
        >
          Report
        </Button>
      </Tooltip>
    </>
  );
}
