"use client";

import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { search } from "@/serverActions";

const SearchInput = () => {
  // since we are using "useSearchParams" this comp bcomes a dynamic componet/client
  const searchParam = useSearchParams();
  return (
    <form action={search} className="border-2">
      <Input
        name="term"
        defaultValue={searchParam.get("term") || ""}
        placeholder="Search Post"
      />
    </form>
  );
};

export default SearchInput;
