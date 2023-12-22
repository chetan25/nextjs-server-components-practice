"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";

export const SignInButton = () => {
  return (
    <Button
      type="button"
      onClick={() => signIn()}
      color="secondary"
      variant="bordered"
    >
      SignIn
    </Button>
  );
};

export const SignUpButton = () => {
  return (
    <Button
      type="button"
      onClick={() => signIn()}
      color="primary"
      variant="flat"
    >
      SignUp
    </Button>
  );
};

export const SignOutButton = () => {
  return (
    <Button
      type="button"
      onClick={() => signOut()}
      color="primary"
      variant="flat"
    >
      SignOut
    </Button>
  );
};
