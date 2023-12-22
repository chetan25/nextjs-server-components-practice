import Link from "next/link";
import paths from "@/utils/helpers";
import type { PostData } from "@/db/queries/posts";

type PostListProps = {
  fetchData: () => Promise<PostData[]>;
};
export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();
  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error("Need a slug to link to a post");
    }

    return (
      <div key={post.id} className="border rounded p-2 hover:bg-sky-700">
        <Link href={paths.postShowPath(topicSlug, post.id)}>
          <h3 className="text-lg font-bold">{post.title}</h3>
          <div className="flex flex-row gap-8 mt-2 text-gray-400 hover:text-white">
            <p className="text-xs ">Topic: {topicSlug}</p>
            <p className="text-xs ">By {post.user.name}</p>
            <p className="text-xs">{post._count.comments} comments</p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
