"use client";
import { Button } from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react";

export default function Test() {
  return (
    <div>
      <Button type="button" onClick={() => signIn()}>
        SignIn
      </Button>
      <Button type="button" onClick={() => signOut()}>
        SignOut
      </Button>
    </div>
  );
}
