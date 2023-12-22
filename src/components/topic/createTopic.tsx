"use client";

import {
  Popover,
  PopoverContent,
  Input,
  Button,
  Textarea,
  PopoverTrigger,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import { createTopic } from "@/serverActions";
import FormButton from "@/components/FormButton";

const CreateTopic = () => {
  const [formState, action] = useFormState(createTopic, {
    errors: {},
  });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">New Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(",")}
            />
            <Textarea
              name="description"
              label="description"
              labelPlacement="outside"
              placeholder="Describe your Topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(",")}
            />

            {formState.errors.formError ? (
              <div className="p-2 bg-red-200 border border-red-200 rounded">
                {formState.errors.formError.join(",")}
              </div>
            ) : null}

            <FormButton color="primary">Submit</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default CreateTopic;
