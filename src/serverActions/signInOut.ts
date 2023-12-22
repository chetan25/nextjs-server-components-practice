"use server";

import {
  signIn as NextAuthSignIn,
  signOut as NextAuthSignOut,
} from "next-auth/react";

export async function signIn() {
  return NextAuthSignIn("github");
}

export async function signOut() {
  return NextAuthSignOut();
}
