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
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axiosInstance from "../api/axios";
import { useEffect, useState } from "react";
import { useData } from "@/context/dataContext";
import {
  toastSuccessDeletePoll,
  toastSuccessUpdatePoll,
  toastSuccessVotesPoll,
  toastWarningGeneric,
} from "@/utils/toast.config";
import ProgressBarCustom from "./progressBarCustom";

interface IDataProps {
  dataProps: IPoll;
}

export default function CardPoll({ dataProps }: IDataProps) {
  const toast = useToast();
  const { setData } = useData();
  const [value, setValue] = useState<string>("");
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [option1Percentage, setOption1Percentage] = useState<number>(0);
  const [option2Percentage, setOption2Percentage] = useState<number>(0);
  const [option3Percentage, setOption3Percentage] = useState<number>(0);
  const totalVotes =
    Number(dataProps.votes_option1) +
    Number(dataProps.votes_option2) +
    Number(dataProps.votes_option3);

  useEffect(() => {
    setOption1Percentage(
      calculatePercentage(Number(dataProps.votes_option1), totalVotes)
    );
    setOption2Percentage(
      calculatePercentage(Number(dataProps.votes_option2), totalVotes)
    );
    setOption3Percentage(
      calculatePercentage(Number(dataProps.votes_option3), totalVotes)
    );
  }, [isLoading]);

  const {
    register,
    getValues,
    reset,
    formState: { isSubmitting },
  } = useForm();

  async function updatePoll(dataUp: any) {
    setIsLoading(true);
    try {
      await axiosInstance.put("/updatePoll", {
        id: dataProps.id,
        title: dataUp.title.length === 0 ? undefined : dataUp.title,
        content: dataUp.content.length === 0 ? undefined : dataUp.content,
      });
      setIsEditable(false);

      const result = await axiosInstance.get("/");
      setData(result.data);
      toast(toastSuccessUpdatePoll);
      reset();
    } catch (error) {
      console.log(error);
      toast(toastWarningGeneric);
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  }
  async function updateVotesPoll(dataVote: any) {
    setIsLoading(true);
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
      toast(toastSuccessVotesPoll);
      reset();
    } catch (error) {
      console.log(error);
      toast(toastWarningGeneric);
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  }

  async function deletePoll(id: Number) {
    setIsLoading(true);
    try {
      await axiosInstance.delete("/deletePoll", { data: { id } });
      const result = await axiosInstance.get("/");
      setData(result.data);
      toast(toastSuccessDeletePoll);
    } catch (error) {
      console.log(error);
      toast(toastWarningGeneric);
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  }

  function calculatePercentage(value: number, total: number) {
    return (value / total) * 100;
  }
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      w={["95%", "70%", "45%"]}
    >
      {isLoading ? (
        <Flex
          h={"300px"}
          w={"100%"}
          flexDir={"column"}
          align={"center"}
          justifyContent={"center"}
        >
          <Spinner color="blue.400" thickness="4px" size={"xl"} />
        </Flex>
      ) : (
        <form style={{ width: "100%" }}>
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
                    {...register("title")}
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
                      onClick={() => updatePoll(getValues())}
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
              <CardBody
                display={"flex"}
                flexWrap={"wrap"}
                justifyContent={"space-between"}
              >
                {isEditable ? (
                  <Input
                    id="content"
                    variant="flushed"
                    placeholder="Adicione uma descrição para a enquete!"
                    w={"70%"}
                    {...register("content")}
                  />
                ) : dataProps.content ? (
                  <Stack w={"100%"}>
                    <Text py="2">{dataProps.content}</Text>
                  </Stack>
                ) : (
                  <Stack w={"100%"}>
                    <Button
                      onClick={() => setIsEditable(true)}
                      aria-label="Adicionar descrição"
                      mb={5}
                    >
                      <AddIcon />
                      <Text p={2}>Adicionar descrição</Text>
                    </Button>
                  </Stack>
                )}

                <RadioGroup
                  onChange={setValue}
                  value={value}
                  display={"flex"}
                  w={"100%"}
                  flexDir="row"
                >
                  <Stack width={"50%"}>
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
                  <Flex
                    justifyContent={"space-between"}
                    flexDir={"column"}
                    py={1}
                    w="40%"
                  >
                    <ProgressBarCustom value={option1Percentage} />
                    {dataProps.option2 && (
                      <ProgressBarCustom value={option2Percentage} />
                    )}
                    {dataProps.option3 && (
                      <ProgressBarCustom value={option3Percentage} />
                    )}
                  </Flex>
                </RadioGroup>
              </CardBody>

              <CardFooter
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Button
                  onClick={() => updateVotesPoll(getValues())}
                  variant="solid"
                  colorScheme="blue"
                >
                  Votar
                </Button>
                <Flex>
                  <Text>Total de votos: {totalVotes}</Text>
                </Flex>
              </CardFooter>
            </Stack>
          </FormControl>
        </form>
      )}
    </Card>
  );
}
