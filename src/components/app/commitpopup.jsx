import React, { useState } from "react";
import { Button, Box, Center, HStack } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const CommitPopup = ({ isOpen, onClose, commits }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const processCommitData = () => {
    const weeks = Array(100).fill(0);
    const now = new Date();

    commits.forEach((commit) => {
      const commitDate = new Date(commit.commit.author.date);
      const weekDiff = Math.floor(
        (now - commitDate) / (7 * 24 * 60 * 60 * 1000)
      );
      if (weekDiff >= 0 && weekDiff < 100) {
        weeks[weekDiff]++;
      }
    });

    return weeks.reverse();
  };

  const weeklyCommitData = processCommitData();

  const getPageData = () => {
    const start = currentPage * 10;
    const end = start + 10;
    return weeklyCommitData.slice(start, end);
  };

  const chartData = {
    labels: Array.from(
      { length: 10 },
      (_, i) => `Week ${10 - i + currentPage * 10}`
    ),
    datasets: [
      {
        label: "Commits",
        data: getPageData(),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * 10 < weeklyCommitData.length)
      setCurrentPage(currentPage + 1);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="gray.50">
        <ModalBody>
          <Center>
            <Box
              w="80%"
              h="300px"
              bg="white"
              borderWidth="1px"
              borderRadius="md"
              p={4}
              shadow="md"
            >
              {commits.length > 0 ? (
                <Bar
                  data={chartData}
                  options={{ maintainAspectRatio: false }}
                />
              ) : (
                <p>No commit data available.</p>
              )}
            </Box>
          </Center>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={4}>
            <Button
              colorScheme="blue"
              onClick={handlePreviousPage}
              isDisabled={currentPage === 0}
            >
              Back
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleNextPage}
              isDisabled={(currentPage + 1) * 10 >= weeklyCommitData.length}
            >
              Forward
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CommitPopup;
