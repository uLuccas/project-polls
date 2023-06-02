import { AddIcon, CloseIcon, HamburgerIcon, Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box px={20} py={20} bg={"#ccc"} h={80} w={"100%"}>
      <Flex align={"center"} justifyContent={"space-between"} flexDir={"row"}>
        <Flex height={"100%"} w={"100%"} align={"center"} flexDir="row">
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseIcon w={15} h={15} />
              ) : (
                <HamburgerIcon w={20} h={20} />
              )
            }
            // variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"#"}
            p={7}
            borderRadius={"10"}
            bg={"#1959f954"}
            // onClick={onToggle}
          >
            <AddIcon />
            <Text ml={5}>
              new poll
            </Text>
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
