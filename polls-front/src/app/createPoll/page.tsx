"use client";

import axiosInstance from "@/api/axios";
import {
  toastSuccessCreatePoll,
  toastWarningGeneric,
} from "@/utils/toast.config";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ICreateData {
  title?: String;
  content?: String;
  option1?: String;
  option2?: String;
  option3?: String;
}

export default function CreateNewPoll() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm();

  async function createPoll(data: ICreateData) {
    setIsLoading(true);
    try {
      await axiosInstance.post("/createNewPoll", {
        title: data.title,
        content: data.content ? data.content : undefined,
        option1: data.option1,
        option2: data.option2,
        option3: data.option3 ? data.option3 : undefined,
      });
      reset();
      toast(toastSuccessCreatePoll);
      return;
    } catch (error) {
      console.log(error);
      toast(toastWarningGeneric);
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  }

  return (
    <Box
      gap={7}
      bg={"transparent"}
      w={"100%"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      py={10}
    >
      {isLoading ? (
        <Flex
          h={"calc(100vh - 100px)"}
          flexDir={"column"}
          justifyContent={"center"}
        >
          <Spinner color="blue.400" thickness="4px" size={"xl"} />
        </Flex>
      ) : (
        <Flex
          bg={"gray.600"}
          minH={"500px"}
          w={["90%","70%","50%"]}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"space-around"}
          borderRadius={15}
          py={5}
          px={10}
        >
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            Crie sua enquete
          </Text>
          <form onSubmit={handleSubmit(createPoll)} style={{ width: "100%" }}>
            <FormControl isRequired mb={5}>
              <FormLabel>Título</FormLabel>
              <Input
                type="text"
                variant="flushed"
                placeholder="Título"
                {...register("title", {
                  required: "Campo obrigatório!",
                })}
              />
            </FormControl>
            <FormControl mb={5}>
              <FormLabel>Descrição</FormLabel>
              <Input
                type="text"
                variant="flushed"
                placeholder="Descrição da enquete..."
                {...register("content")}
              />
            </FormControl>
            <FormControl isRequired mb={5}>
              <FormLabel>Opção 1</FormLabel>
              <Input
                type="text"
                variant="flushed"
                placeholder="Siim confia!"
                {...register("option1", {
                  required: "Campo obrigatório!",
                })}
              />
            </FormControl>
            <FormControl isRequired mb={5}>
              <FormLabel>Opção 2</FormLabel>
              <Input
                type="text"
                variant="flushed"
                placeholder="Eita, sem chance"
                {...register("option2")}
              />
            </FormControl>
            <FormControl mb={5}>
              <FormLabel>Opção 3</FormLabel>
              <Input
                type="text"
                variant="flushed"
                placeholder="Hmm, talvez"
                {...register("option3")}
              />
            </FormControl>

            <Flex w={"100%"} flexDir={["column", "row", "row"]} justifyContent={"space-around"} mt={10}>
              <Button type="reset" variant="solid" colorScheme="blue" mb={["5", "none","none"]}>
                Limpar
              </Button>
              <Button
                type="submit"
                variant="solid"
                colorScheme="blue"
                isLoading={isSubmitting}
              >
                Criar
              </Button>
            </Flex>
          </form>
        </Flex>
      )}
    </Box>
  );
}
