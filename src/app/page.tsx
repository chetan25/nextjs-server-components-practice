import CreateTopic from "@/components/topic/createTopic";
import List from "@/components/topic/list";
import { Divider } from "@nextui-org/react";
import { fetchTopPost } from "@/db/queries/posts";
import PostList from "@/components/posts/post-list";

export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 m-8">
      <div className="col-span-3 h-full border shadow py-3 px-2">
        <h1 className="text-xl m-2">Top Posts</h1>
        <PostList fetchData={fetchTopPost} />
      </div>
      <div className="border shadow py-3 px-2 h-full">
        <CreateTopic />
        <Divider className="my-2" />
        <h3 className="text-lg">Topics</h3>
        <List />
      </div>
    </div>
  );
}
