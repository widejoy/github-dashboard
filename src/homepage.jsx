import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Center, VStack, Text } from "@chakra-ui/react";
import { Field } from "./components/ui/field";
import { Octokit } from "@octokit/core";
import RepoList from "./components/app/repotile";
import { setUsername } from "./redux/slices/githubSlice";
import { useState } from "react";

export default function HomePage() {
  const username = useSelector((state) => state.github.username);
  const dispatch = useDispatch();

  const [repos, setRepos] = useState([]);

  const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_TOKEN,
  });

  const fetchRepos = async () => {
    try {
      const response = await octokit.request("GET /users/{username}/repos", {
        username,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      console.log(response.data);
      setRepos(response.data);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  return (
    <VStack spacing={4} p={4}>
      <Field label="GitHub Username" orientation="horizontal">
        <Input
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => dispatch(setUsername(e.target.value))}
        />
      </Field>
      <Center>
        <Button colorScheme="blue" onClick={fetchRepos}>
          Fetch Repositories
        </Button>
      </Center>
      {repos.length > 0 && (
        <VStack spacing={4} mt={4} w="100%">
          <Text fontWeight="bold" fontSize="lg">
            Repositories:
          </Text>
          {repos.map((repo) => (
            <RepoList key={repo.id} repo={repo} />
          ))}
        </VStack>
      )}
    </VStack>
  );
}
