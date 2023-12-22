"use client";

import { useFormState } from "react-dom";
import {
  Input,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import FormButton from "@/components/FormButton";
import { createPost } from "@/serverActions";

const CreatePost = ({ slug }: { slug: string }) => {
  const [formState, action] = useFormState(createPost.bind(null, slug), {
    errors: {},
  });
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create Post</h3>
            <Input
              name="title"
              label="title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(",")}
            />
            <Textarea
              name="content"
              label="content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(",")}
            />
          </div>
          {formState.errors.formError ? (
            <div className="rounded bg-red-200 p-2 border border-red-400">
              {formState.errors.formError.join(",")}
            </div>
          ) : null}
          <FormButton>Create Post</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default CreatePost;
