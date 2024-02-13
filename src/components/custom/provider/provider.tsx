import React, { type ReactNode } from "react";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";

interface Props {
  children: ReactNode;
}

const Provider = (props: Props) => {
  return (
    <ClerkProvider>
      <TRPCReactProvider>{props.children}</TRPCReactProvider>
    </ClerkProvider>
  );
};

export default Provider;
