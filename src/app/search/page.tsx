import { redirect } from "next/navigation";
import PostList from "@/components/posts/post-list";
import { fetchBySearchTerm } from "@/db/queries/posts";

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const { term } = searchParams;
  if (!term) {
    redirect("/");
  }

  return (
    <div>
      <PostList fetchData={() => fetchBySearchTerm(term)} />
    </div>
  );
};

export default SearchPage;
