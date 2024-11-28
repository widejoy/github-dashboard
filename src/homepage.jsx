import { Button, Input } from "@chakra-ui/react";
import { Field } from "./components/ui/field";
import { Center } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <>
      <Field label="Input" orientation="horizontal">
        <Input placeholder="me@example.com" />
      </Field>
      <Button>Submit</Button>
    </>
  );
}
