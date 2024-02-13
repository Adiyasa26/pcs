"use client";

import React from "react";
import { Icon } from "@/components/custom/Icon/Icon";
import { type icons } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmployeeActivityIconProps {
  icons: keyof typeof icons;
  title?: string;
  status?: "default" | "danger";
  description?: string;
}

const EmployeeActivityIcon = (props: EmployeeActivityIconProps) => {
  const { status = "default" } = props;
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <Icon name={props.icons} className="h-8 w-8 text-rose-500" />
      <div className="flex flex-col items-center justify-center text-gray-900">
        <h1
          className={cn(
            "text-sm font-bold",
            status === "default" ? "text-gray-900" : "text-rose-500",
          )}
        >
          {props?.title}
        </h1>
        <p className="text-xs font-thin">{props?.description}</p>
      </div>
    </div>
  );
};

const EmployeeActivity = () => {
  return (
    <div className="px-4">
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h1 className="text-base font-bold">Today's Activity</h1>
      <div className="flex items-center justify-between gap-3">
        <EmployeeActivityIcon icons="Clock9" description="Check in" />
        <EmployeeActivityIcon icons="TimerReset" description="Working Hours" />
        <EmployeeActivityIcon icons="Clock6" description="Check Out" />
      </div>
    </div>
  );
};

export default EmployeeActivity;
