import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { db } from "@/db";
import paths from "@/utils/helpers";

const List = async () => {
  // get top 10 topic with most posts
  const topics = await db.topic.findMany({
    orderBy: [
      {
        posts: {
          _count: "desc",
        },
      },
    ],
    take: 10,
  });

  const renderedTopics = topics.map((topic) => {
    return (
      <div key={topic.id}>
        <Link href={paths.topicShowPath(topic.slug)}>
          <Chip color="secondary" variant="shadow">
            {topic.slug}
          </Chip>
        </Link>
      </div>
    );
  });

  return <div className="flex flex-col flex-wrap gap-3">{renderedTopics}</div>;
};

export default List;
