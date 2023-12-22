"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProviderProps) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;
