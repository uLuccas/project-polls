import { Box, Progress, Text } from "@chakra-ui/react";

interface IProps {
  value: number;
}

export default function ProgressBarCustom({ value }: IProps) {
  return (
    <Box position="relative">
      <Progress hasStripe borderRadius={"10px"} value={value} bg={"#1a202c"} />
      <Text
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        color="white"
        fontWeight="bold"
      >
        {`${value.toFixed(1)}%`}
      </Text>
    </Box>
  );
}
