import { cn } from "@/lib/utils";
import React, { type ReactNode } from "react";

interface HeaderProps {
  page?: string;
  className?: string;
  children?: ReactNode;
}

const Footer = (props: HeaderProps) => {
  console.log(props?.page);

  return (
    <div
      className={cn(
        "xxxs:border-t xxxs:bottom-0 sticky z-50 flex h-20 w-full border-slate-300 bg-white md:bottom-4 md:mb-4 md:rounded-2xl md:border md:bg-white/90",
        props?.className,
      )}
    >
      {props?.children}
    </div>
  );
};

export default Footer;
