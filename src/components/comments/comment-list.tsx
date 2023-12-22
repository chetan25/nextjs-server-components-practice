import CommentShow from "@/components/comments/comment-show";
import type { CommentsData } from "@/db/queries/comments";
import { fetchCommentsWithPostId } from "@/db/queries/comments";

interface CommentListProps {
  fetchData?: () => Promise<CommentsData[]>;
  postId: string;
}

export default async function CommentList({ postId }: CommentListProps) {
  const comments = await fetchCommentsWithPostId(postId);
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        postId={postId}
        commentId={comment.id}
        comments={comments}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
