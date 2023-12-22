---
title: Next JS Server Components and Actions.
excerpt: Simple App using Next JS, Prisma and Next UI to build an app to learn Next JS.
Tools: ["React", "NextJS", "Next UI", "Next Auth", "Prisma"]
---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### [Next UI React](https://nextui.org/)

NextUI is a UI library for React that helps you build beautiful and accessible user interfaces. Created on top of Tailwind CSS and React Aria.

- It needs framer-motion too so we need to install them as a dep.

```js
`npm i @nextui-org/react framer-motion`;
```

- We than need to configure tailwind to tell it where to look for classes we use by

```js
// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
```

- Then it is essential to add the NextUIProvider at the root of your application. For this we create a new `provider.ts` file at the root under `src/app`. We make this a client component since it relies on context.

```js
// provider.ts
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode,
};

const Providers = ({ children }: ProviderProps) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;
```

\*\*\* If node updates fails using nvm and you get a message saying `N/A` when u run `nvm ls-remote` than
run `export NVM_NODEJS_ORG_MIRROR=http://nodejs.org/dist`

`nvm alias default VERSION_NUMBER`

### Prisma

We use the Prisma since its a dev friendly typescript based ORM.

- Install -- `npm i prisma`
- Initialize -- `npx prisma init --datasource-provider sqlite`. This will initialize prisma and create a "prisma" folder that will have your "schema.prisma" file. Update this file to add your schema definitions.
- Build local -- `npx prisma migrate dev`. This will create the migrations needed to setup your database.

#### Authentication

For authentication we use the following libraries:

- @auth/core - Is the older version of next-auth an dis used for some types.
- @prisma/client & @auth/prisma-adapter - are the adapters for prisam to work well with @auth.
- [next-auth](https://next-auth.js.org/) - NextAuth.js is a complete open-source authentication solution for Next.js applications.

We create a local file `auth.ts` that creates the `NextAuthOptions` config object that declares authentication provider and adapter and is passed to `NextAuth` to create a handler. This `handler` is then used in the `api` to form the basic api routes.

```js
export { handler as GET, handler as POST } from "@/auth";
```

We also create a `getUserSession` function that invokes the `getServerSession` function and pass the `NextAuthOptions` config object, this returns a user session.

In the server side code we use the `getUserSession` to get the session and in client side we use the `useSeesion` hook.
`import { useSession } from "next-auth/react";`

#### Server Action

```js
// any action passed to useFormState takes the "formState" as first argument and formDtata as second
const [formState, action] = useFormState(createTopic, { messgae: "" });

// form also takes the new action
<form action={action}>

export async function createTopic({ message: string }, formData: FormData) {
    // can return now an object
    return {
      message: "test",
    };
  }
```

- If you need to pass extra argument to the serverFunction

```js
// if we were using server action directly in form we will bind those

cosnt bindedAction =
// If we need to pass a argument to the server action function we would use bind

const bindedAction = createPost.bin(null, slug);

// now pass to form
<form action={bindedAction}></form>

// but with useFormState we can also bind
 const [formState, action] = useFormState(createPost.bind(null, slug), {
    errors: {},
  });
```

### Cache

- Cache memoization sys is cleared out b/w incoming requests, between different users.
- Automatically used by built in "fetch" system
- Caching can be also used with db queries, by using cache function from 'react'
