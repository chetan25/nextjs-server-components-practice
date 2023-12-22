"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUserSession } from "@/auth";
import { db } from "@/db";
import paths from "@/utils/helpers";

const PostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

export type CreatePosttate = {
  errors: {
    title?: string[];
    content?: string[];
    formError?: string[];
  };
};

export async function createPost(
  slug: string,
  formState: CreatePosttate,
  formData: FormData
): Promise<CreatePosttate> {
  const session = await getUserSession();

  if (!session || !session.user) {
    return {
      errors: {
        formError: ["Must be signedIn to create a post"],
      },
    };
  }

  const title = formData.get("title");
  const content = formData.get("content");

  const results = PostSchema.safeParse({
    title,
    content,
  });

  if (!results.success) {
    return {
      errors: results.error.flatten().fieldErrors,
    };
  }

  let post;
  try {
    const topic = await db.topic.findFirst({
      where: {
        slug: slug,
      },
    });
    if (!topic) {
      return {
        errors: {
          formError: ["Cannot find topic"],
        },
      };
    }
    post = await db.post.create({
      data: {
        title: results.data.title,
        content: results.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (e) {
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

  revalidatePath(`${paths.topicShowPath(slug)}`);
  redirect(`${paths.postShowPath(slug, post.id)}`);
}
