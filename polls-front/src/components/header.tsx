"use-client";

import {
  AddIcon,
  CloseIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  Icon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { FiHome } from "react-icons/fi";

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex
      align={"center"}
      justifyContent={"space-between"}
      w={"100%"}
      m={0}
      py={2}
      px={10}
      flexDir={"row"}
    >
      <Link
        href="/"
        color="blue.400"
        _hover={{ color: "blue.500", textDecoration: "none" }}
      >
        <Heading>Polls Project</Heading>
      </Link>

      <Button
        h={"auto"}
        fontWeight={400}
        fontSize={"sm"}
        variant={"link"}
        borderRadius={"10"}
        bg={"transparent"}
        _hover={{ textDecoration: "none", bg: "blue.500", color: "black" }}
      >
        <Link
          p={2}
          display={"flex"}
          alignItems={"center"}
          href="/createPoll"
          color="blue.400"
          _hover={{ color: "black" }}
        >
          <AddIcon mr={2} />
          <Text>Nova enquete</Text>
        </Link>
      </Button>
    </Flex>
  );
}
