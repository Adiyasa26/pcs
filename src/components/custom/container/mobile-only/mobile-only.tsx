import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

const MobileOnly = (props: Props) => {
  return (
    <div className={cn("mx-auto w-full max-w-lg", props.className)}>
      {props.children}
    </div>
  );
};

export default MobileOnly;
