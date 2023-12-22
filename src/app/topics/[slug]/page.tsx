import CreatePost from "@/components/posts/create";
import { fetchPostsBySlug } from "@/db/queries/posts";
import PostList from "@/components/posts/post-list";

const TopicShowpage = ({ params: { slug } }: { params: { slug: string } }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostsBySlug(slug)} />
      </div>
      <div>
        <CreatePost slug={slug} />
      </div>
    </div>
  );
};

export default TopicShowpage;
