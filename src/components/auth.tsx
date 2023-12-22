"use client";

import {
  NavbarItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import {
  SignInButton,
  SignUpButton,
  SignOutButton,
} from "@/components/navButtons";

const Auth = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  const AuthenticatedContent = () => {
    return (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session!.user!.image || ""} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <SignOutButton />
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  const UnAuthenticatedContent = () => {
    return (
      <>
        <NavbarItem>
          <SignInButton />
        </NavbarItem>
        <NavbarItem>
          <SignUpButton />
        </NavbarItem>
      </>
    );
  };

  return session && session.user ? (
    <AuthenticatedContent />
  ) : (
    <UnAuthenticatedContent />
  );
};

export default Auth;
