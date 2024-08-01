"use client";

import { Flex, Heading, Text } from "@chakra-ui/react";
import TextTransition, { presets } from "react-text-transition";
import { useEffect, useState } from "react";
import { Link } from "@chakra-ui/next-js";

export default function AnimatedText() {
  const linkData = [
    {
      shortCode: "campnet",
      longLink: "https://github.com/Devsoc-BPGC/auto-campnet",
    },
    {
      shortCode: "github",
      longLink: "https://github.com/riskycase",
    },
    {
      shortCode: "linkedin",
      longLink: "https://www.linkedin.com/in/riskycase",
    },
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => (index + 1) % linkData.length),
      5000 // every 5 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <Flex
      padding={4}
      direction="column"
      gap={1}
      minWidth="min(28rem, 100%)"
      maxWidth="100%"
    >
      <Heading as={"h1"} fontSize="xx-large" alignSelf="center" marginY={4}>
        Link shortener
      </Heading>
      <Text>Shorten long, boring, old links like</Text>
      <Link href={linkData[index].longLink}>
        <TextTransition springConfig={presets.wobbly}>
          <Text as="p" noOfLines={1}>
            {linkData[index].longLink}
          </Text>
        </TextTransition>
      </Link>
      <Text>to short links as</Text>
      <Link href={`https://riskycase.in/${linkData[index].shortCode}`}>
        <Flex>
          <Text>riskycase.in/</Text>
          <TextTransition springConfig={presets.wobbly}>
            <Text as="span">{linkData[index].shortCode}</Text>
          </TextTransition>
        </Flex>
      </Link>
    </Flex>
  );
}
