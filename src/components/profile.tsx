"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  return (
    <div>{status === "authenticated" && JSON.stringify(session.user)}</div>
  );
}
