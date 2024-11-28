import { Box, Text } from "@chakra-ui/react";

export default function RepoList({ repo }) {
  const handleCardClick = () => {};

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4}
      w="100%"
      cursor="pointer"
      _hover={{ bg: "blue.50" }}
      onClick={handleCardClick}
    >
      <Text fontWeight="bold">{repo.name}</Text>
      {repo.description && <Text mt={2}>{repo.description}</Text>}
    </Box>
  );
}
