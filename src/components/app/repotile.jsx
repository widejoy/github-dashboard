import { Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Octokit } from "@octokit/core";
import { useState } from "react";
import { setRepository } from "../../redux/slices/githubSlice";

export default function RepoList({ repo }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.github.username);
  const [data, setData] = useState("");
  const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_TOKEN,
  });
  const fetchDetails = async () => {
    try {
      const repos = await octokit.request("GET /repos/{owner}/{repo}/commits", {
        owner: username,
        repo: repo.name,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      console.log(repos.data);
      setData(repos.data);
    } catch (e) {
      console.error("Error fetching repositories:", e);
    }
  };
  const handleCardClick = () => {
    dispatch(setRepository(repo));
    fetchDetails();
  };

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
