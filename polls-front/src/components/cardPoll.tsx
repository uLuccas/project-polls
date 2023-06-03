"use client";
import { IPoll } from "@/app/page";
import { useForm } from "react-hook-form";
import {
  AddIcon,
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  Card,
  Text,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Button,
  Radio,
  RadioGroup,
  IconButton,
  Flex,
  Input,
  FormControl,
} from "@chakra-ui/react";
import axiosInstance from "../api/axios";
import { useState } from "react";
import { useData } from "@/context/dataContext";

interface IDataProps {
  dataProps: IPoll;
}

export default function CardPoll({ dataProps }: IDataProps) {
  const [value, setValue] = useState<string>("");
  const [isEditable, setIsEditable] = useState(false);
  const { setData } = useData();

  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function updatePoll(dataUp: any) {
    try {
      await axiosInstance.put("/updatePoll", {
        ...dataUp,
        id: dataProps.id,
      });

      setIsEditable(false);
      const result = await axiosInstance.get("/");
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateVotesPoll(dataVote: any) {
    const key: string = "votes_" + dataVote.votes;
    const vote = Number(dataProps[key]) + 1;

    try {
      await axiosInstance.put("/updateVotesPoll", {
        id: dataProps.id,
        votes_option1: key === "votes_option1" ? vote : undefined,
        votes_option2: key === "votes_option2" ? vote : undefined,
        votes_option3: key === "votes_option3" ? vote : undefined,
      });

      const result = await axiosInstance.get("/");
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePoll(id: Number) {
    try {
      await axiosInstance.delete("/deletePoll", { data: { id } });
      const result = await axiosInstance.get("/");
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      w={"40%"}
    >
      <form onSubmit={handleSubmit(updatePoll)} style={{ width: "100%" }}>
        <FormControl>
          <Stack w={"100%"}>
            <CardHeader
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              bg={"blue.200"}
            >
              {isEditable ? (
                <Input
                  variant="flushed"
                  placeholder="Título"
                  w={"70%"}
                  id="firstName"
                  {...register("title", {
                    required: "Campo obrigatório!",
                  })}
                />
              ) : (
                <Heading size="md">{dataProps.title}</Heading>
              )}
              <Flex>
                <IconButton
                  onClick={() => setIsEditable(!isEditable)}
                  aria-label="Editar"
                  icon={!isEditable ? <EditIcon /> : <CloseIcon w={3} />}
                  mr={2}
                />
                {isEditable ? (
                  <IconButton
                    isLoading={isSubmitting}
                    type="submit"
                    aria-label="Salvar alterações"
                    icon={<CheckIcon />}
                  />
                ) : (
                  <IconButton
                    onClick={() => deletePoll(dataProps.id)}
                    aria-label="Deletar"
                    _hover={{ bg: "red", color: "black" }}
                    icon={<DeleteIcon />}
                  />
                )}
              </Flex>
            </CardHeader>
            <CardBody>
              {isEditable ? (
                <Input
                  id="content"
                  variant="flushed"
                  placeholder="Adicione uma descrição para a enquete!"
                  w={"70%"}
                  {...register("content")}
                />
              ) : dataProps.content ? (
                <Text py="2">{dataProps.content}</Text>
              ) : (
                <Button
                  onClick={() => setIsEditable(true)}
                  aria-label="Adicionar descrição"
                  mb={5}
                >
                  <AddIcon />
                  <Text p={2}>Adicionar descrição</Text>
                </Button>
              )}
              <RadioGroup onChange={setValue} value={value}>
                <Stack>
                  <Radio
                    {...register("votes")}
                    size="md"
                    value="option1"
                    colorScheme="blue"
                  >
                    {dataProps.option1}
                  </Radio>
                  {dataProps.option2 && (
                    <Radio
                      {...register("votes")}
                      size="md"
                      value="option2"
                      colorScheme="blue"
                    >
                      {dataProps.option2}
                    </Radio>
                  )}
                  {dataProps.option3 && (
                    <Radio
                      {...register("votes")}
                      size="md"
                      value="option3"
                      colorScheme="blue"
                    >
                      {dataProps.option3}
                    </Radio>
                  )}
                </Stack>
              </RadioGroup>
            </CardBody>

            <CardFooter display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Button
                onClick={() => updateVotesPoll(getValues())}
                variant="solid"
                colorScheme="blue"
              >
                Votar
              </Button>
              <Flex>
                <Text>
                  Total de votos:{" "}
                  {Number(dataProps.votes_option1) +
                    Number(dataProps.votes_option2) +
                    Number(dataProps.votes_option3)}
                </Text>
              </Flex>
            </CardFooter>
          </Stack>
        </FormControl>
      </form>
    </Card>
  );
}
