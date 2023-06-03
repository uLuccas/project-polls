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
      h={""}
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

      {/* <Button
        fontSize={"sm"}
        fontWeight={400}
        variant={"link"}
        p={7}
        borderRadius={"10"}
        h={5}
        bg={"#1959f954"}
        // onClick={onToggle}
      >
        <AddIcon mr={2} />
        <Link
          href="/createPoll"
          color="blue.400"
          _hover={{ color: "blue.500" }}
        >
          Nova enquete
        </Link>
      </Button> */}

      <Menu>
        <MenuButton
          onClick={onToggle}
          as={IconButton}
          aria-label="Options"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="outline"
        />
        <MenuList bg={"#1A202C"}>
          <MenuItem bg={"#1A202C"} icon={<FiHome />}>
            Home
          </MenuItem>
          <MenuItem bg={"#1A202C"} icon={<AddIcon />}>
            Cadastrar Enquete
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
