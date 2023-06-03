"use client";

import axiosInstance from "@/api/axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface ICreateData {
  title?: String;
  content?: String;
  option1?: String;
  option2?: String;
  option3?: String;
}

export default function CreateNewPoll() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function createPoll(data: ICreateData) {
    try {
      await axiosInstance.post("/createNewPoll", {
        title: data.title,
        content: data.content ? data.content : undefined,
        option1: data.option1,
        option2: data.option2,
        option3: data.option3 ? data.option3 : undefined,
      });

      reset();
      return;
    } catch (error) {
      console.log(error);
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
      pt={10}
    >
      <Flex
        bg={"gray.600"}
        minH={"500px"}
        w={"400px"}
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

          <Flex w={"100%"} justifyContent={"space-around"} mt={10}>
            <Button type="reset" variant="solid" colorScheme="blue">
              Apagar
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
    </Box>
  );
}
