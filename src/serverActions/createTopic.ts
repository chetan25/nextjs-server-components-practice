"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getUserSession } from "@/auth";
import type { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/utils/helpers";

const TopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, { message: "Must be lower case or dashes without space" }),
  description: z.string().min(10),
});

export type CreateTopicState = {
  errors: {
    name?: string[];
    description?: string[];
    formError?: string[];
  };
};

export async function createTopic(
  formState: CreateTopicState,
  formData: FormData
): Promise<CreateTopicState> {
  const session = await getUserSession();
  if (!session || !session.user) {
    return {
      errors: {
        formError: ["Must be signedIn to create a topic"],
      },
    };
  }

  const name = formData.get("name");
  const description = formData.get("description");
  console.log(name, description);

  const result = TopicSchema.safeParse({
    name,
    description,
  });

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    console.log(errors);
    return {
      errors,
    };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        errors: {
          formError: [e.message],
        },
      };
    } else {
      return {
        errors: {
          formError: ["Somethig went wrong"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect(`${paths.topicShowPath(topic.slug)}`);
}
