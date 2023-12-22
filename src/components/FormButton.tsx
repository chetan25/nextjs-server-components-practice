"use client";

import { Button } from "@nextui-org/react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

const FormButton = ({
  children,
  color,
}: {
  children: ReactNode;
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
}) => {
  const { pending } = useFormStatus();

  return (
    <Button color={color} type="submit" isLoading={pending}>
      {children}
    </Button>
  );
};

export default FormButton;
