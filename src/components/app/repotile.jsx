import { Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Octokit } from "@octokit/core";
import { useState } from "react";
import { setRepository } from "../../redux/slices/githubSlice";
import CommitPopup from "./CommitPopup";

export default function RepoList({ repo }) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.github.username);
  const [isOpen, setIsOpen] = useState(false); // Replace useDisclosure with useState
  const [commits, setCommits] = useState([]);
  const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_TOKEN,
  });

  const fetchDetails = async () => {
    try {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/commits",
        {
          owner: username,
          repo: repo.name,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
      setCommits(response.data);
    } catch (e) {
      console.error("Error fetching commits:", e);
    }
  };

  const handleCardClick = async () => {
    dispatch(setRepository(repo));
    await fetchDetails();
    setIsOpen(true); // Open the modal
  };

  const handleClose = () => {
    setIsOpen(false); // Close the modal
  };

  return (
    <>
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
      <CommitPopup isOpen={isOpen} onClose={handleClose} commits={commits} />
    </>
  );
}
