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

      {/* <Menu>
        <MenuButton
          // onClick={onToggle}
          as={IconButton}
          aria-label="Options"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="outline"
        />
        <MenuList bg={"#1A202C"}>
          <MenuItem bg={"#1A202C"} icon={<FiHome />}>
            Home
          </MenuItem>
          <MenuItem bg={"#1A202C"} zIndex={0} icon={<AddIcon />}>
            <Button
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              p={7}
              borderRadius={"10"}
              h={5}
              bg={"#1959f954"}
            >
              <AddIcon mr={2} />
              <Link
                href="/createPoll"
                color="blue.400"
                _hover={{ color: "blue.500" }}
              >
                Nova enquete
              </Link>
            </Button>
          </MenuItem>
        </MenuList>
      </Menu> */}
    </Flex>
  );
}
