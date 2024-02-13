import { cn } from "@/lib/utils";
import React, { type ReactNode } from "react";

interface HeaderProps {
  page?: string;
  className?: string;
  children?: ReactNode;
}

const Footer = (props: HeaderProps) => {
  return (
    <div
      className={cn(
        "sticky z-50 flex h-20 w-full border-slate-300 bg-white xxxs:bottom-0 xxxs:border-t md:bottom-4 md:mb-4 md:rounded-2xl md:border md:bg-white/90",
        props?.className,
      )}
    >
      {props?.children}
    </div>
  );
};

export default Footer;
