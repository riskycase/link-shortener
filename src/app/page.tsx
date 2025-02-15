import { SimpleGrid } from "@chakra-ui/react";
import Image from "next/image";
import graphic from "@/../public/undraw_link_shortener_mvf6.svg";
import AnimatedText from "@/components/home/AnimatedText";

export default function Home() {
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
        alt="Link shortener graphic"
      />
      <AnimatedText />
    </SimpleGrid>
  );
}
