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
export const toastSuccessCreatePoll: UseToastOptions = {
  position: "top-right",
  title: "Enquete criada!",
  description: "Parabéns sua enquete foi criada com sucesso!",
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
export const toastSuccessUpdatePoll: UseToastOptions = {
  position: "top-right",
  title: "Enquete atualizada",
  description: "A enquete foi atualizada com êxito!",
  status: "success",
  duration: 5000,
  isClosable: true,
};
export const toastSuccessVotesPoll: UseToastOptions = {
  position: "top-right",
  title: "Voto registrado",
  description: "Seu voto foi registrado com êxito!",
  status: "success",
  duration: 5000,
  isClosable: true,
};
export const toastSuccessDeletePoll: UseToastOptions = {
  position: "top-right",
  title: "Enquete deleteda",
  description: "A enquete foi deletada com êxito!",
  status: "success",
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
export const toastWarningGeneric: UseToastOptions = {
    position: "top-right",
    title: "Ops..",
    description:"Algo de errado aconteceu. Por favor tente novamente mais tarde!",
    status: "warning",
    duration: 5000,
    isClosable: true,
};
