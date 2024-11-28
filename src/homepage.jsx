import { useState } from "react";
import { Button, Input, Center, VStack } from "@chakra-ui/react";
import { Field } from "./components/ui/field";
import { Octokit } from "@octokit/core";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);

  const fetchRepos = async () => {
    try {
      const octokit = new Octokit({
        auth: "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",
      });

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
