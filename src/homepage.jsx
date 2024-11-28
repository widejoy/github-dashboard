import { useState } from "react";
import { Button, Input, Center, VStack } from "@chakra-ui/react";
import { Field } from "./components/ui/field";
import { Octokit } from "@octokit/core";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  s;

  const octokit = new Octokit({
    auth: import.meta.env.GITHUB_TOKEN,
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
          onChange={(e) => setUsername(e.target.value)}
        />
      </Field>
      <Center>
        <Button colorScheme="blue" onClick={fetchRepos}>
          Fetch Repositories
        </Button>
      </Center>
      {repos.length > 0 && (
        <VStack spacing={2} mt={4}>
          <strong>Repositories:</strong>
          {repos.map((repo) => (
            <div key={repo.id}>{repo.name}</div>
          ))}
        </VStack>
      )}
    </VStack>
  );
}
