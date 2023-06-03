import { UseToastOptions } from "@chakra-ui/react";

export const toastSuccessGet: UseToastOptions = {
  position: "top-right",
  title: "Listagem completa!",
  description: "Todas as enquetes carregadas com sucesso!",
  status: "success",
  colorScheme: "blue",
  duration: 5000,
  isClosable: true,
};
export const toastSuccessGetNoPoll: UseToastOptions = {
  position: "top-right",
  title: "Ops",
  description: "Estamos sem enquetes no momento!",
  status: "warning",
  duration: 5000,
  isClosable: true,
};
export const toastWarningGet: UseToastOptions = {
    position: "top-right",
    title: "Ops, erro ao carregar enquetes",
    status: "warning",
    duration: 5000,
    isClosable: true,
};
