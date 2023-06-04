"use client";
import CardPoll from "@/components/cardPoll";
import { Flex, Stack, Spinner, Text, useToast } from "@chakra-ui/react";
import axiosInstance from "../api/axios";
import { FaRegSurprise } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useData } from "../context/dataContext";
import {
  toastSuccessGet,
  toastSuccessGetNoPoll,
  toastWarningGet,
} from "@/utils/toast.config";

export interface IPoll {
  id: Number;
  title: String;
  content?: String;
  option1: String;
  option2?: String;
  option3?: String;
  votes_option1?: Number;
  votes_option2?: Number;
  votes_option3?: Number;
  created_at: Date;
  updated_at: Date;
  [key: string]: Number | String | Date | undefined;
}

export default function Home() {
  const toast = useToast();
  const { data, setData } = useData();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getPolls() {
    setIsLoading(true);
    try {
      const result = await axiosInstance.get("/");
      setData(result.data);

      if (result.data.length > 0) {
        toast(toastSuccessGet);
      } else {
        toast(toastSuccessGetNoPoll);
      }
      return;
    } catch (error) {
      toast({
        ...toastWarningGet,
        description: `${error}`,
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getPolls();
  }, []);

  return (
    <Stack
      gap={7}
      bg={"transparent"}
      w={"100%"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      pt={10}
    >
      {isLoading ? (
        <Flex
          h={"calc(100vh - 100px)"}
          flexDir={"column"}
          justifyContent={"center"}
        >
          <Spinner color="blue.400" thickness="4px" size={"xl"} />
        </Flex>
      ) : data ? (
        data.map((item) => <CardPoll key={String(item.id)} dataProps={item} />)
      ) : (
        <Flex
          h={"200px"}
          w={"300px"}
          bg={"gray.600"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"space-around"}
          borderRadius={15}
          py={5}
          px={10}
        >
          <Text>Oh não!</Text>
          <FaRegSurprise size={50} color="#000" />
          <Text>Estamos sem enquete.</Text>
        </Flex>
      )}
    </Stack>
  );
}
