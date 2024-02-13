import { cn } from "@/lib/utils";
import React, { type ReactNode } from "react";

interface HeaderProps {
  page?: string;
  className?: string;
  children?: ReactNode;
}

const Header = (props: HeaderProps) => {
  console.log(props?.page);

  return (
    <div
      className={cn(
        "h-18 sticky top-0 z-50 flex w-full bg-white p-4",
        props?.className,
      )}
    >
      {props?.children}
    </div>
  );
};

export default Header;
