"use client";
import CardPoll from "@/components/cardPoll";
import { Flex, Stack } from "@chakra-ui/react";
import axiosInstance from "../api/axios";
import { useEffect, useState } from "react";
import { useData } from "../context/dataContext";

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
  const { data, setData } = useData();

  async function getPolls() {
    try {
      const result = await axiosInstance.get("/");
      setData(result.data);
      console.log(result.data);
      return;
    } catch (error) {
      console.log(error);
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
      {data &&
        data.map((item) => <CardPoll key={String(item.id)} dataProps={item} />)}
    </Stack>
  );
}
