import { cache } from "react";
import { db } from "@/db";

export type CommentsData = Awaited<
  ReturnType<typeof fetchCommentsWithPostId>
>[number];

export const fetchCommentsWithPostId = cache((postId: string) => {
  return db.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
});
