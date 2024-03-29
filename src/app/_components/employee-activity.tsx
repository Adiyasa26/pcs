"use client";

import React, { type ReactNode } from "react";
import { Icon } from "@/components/custom/Icon/Icon";
import { type icons } from "lucide-react";
import { cn, getDateformat } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { api } from "@/trpc/react";
import Countdown, { type CountdownRenderProps } from "react-countdown";

interface EmployeeActivityIconProps {
  icons: keyof typeof icons;
  title?: string | ReactNode;
  children?: ReactNode;
  description?: string;
  data?: string;
}

const Renderer = ({ hours, minutes, seconds }: CountdownRenderProps) => {
  return (
    <span
      className={cn(
        "text-sm font-bold",
        hours < 4 ? "text-rose-500" : "text-gray-900",
      )}
    >
      {hours}:{minutes}:{seconds}
    </span>
  );
};

const EmployeeActivityIcon = (props: EmployeeActivityIconProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <Icon name={props.icons} className="h-8 w-8 text-rose-500" />
      <div className="flex flex-col items-center justify-center text-gray-900">
        <h1 className={cn("text-sm font-bold")}>{props?.title}</h1>
        {props?.children}
        <p className="text-xs font-thin">{props?.description}</p>
      </div>
    </div>
  );
};

const EmployeeActivity = () => {
  const user = useUser();
  const today = getDateformat({ date: new Date(), type: "yyyy-MM-dd" });

  const getAttendanceCheckIn = api.attendace.getSpecificType.useQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      userId: user?.user?.id!,
      today: today,
      attendanceType: 1,
    },
    {
      enabled: !!user?.user?.id,
    },
  );
  const getAttendanceCheckOut = api.attendace.getSpecificType.useQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      userId: user?.user?.id!,
      today: today,
      attendanceType: 2,
    },
    {
      enabled: !!user?.user?.id,
    },
  );

  const checkInUpdatedAt = getAttendanceCheckIn?.data?.at(-1)?.updatedAt;
  const checkinHours = checkInUpdatedAt?.getHours();
  const checkinMinute = checkInUpdatedAt?.getMinutes();
  const checkInFullClock = `${checkinHours}:${checkinMinute}`;

  const checkOutUpdatedAt = getAttendanceCheckOut?.data?.at(-1)?.updatedAt;
  const checkOutHours = checkOutUpdatedAt?.getHours();
  const checkOutMinute = checkOutUpdatedAt?.getMinutes();
  const checkOutFullClock = `${checkOutHours}:${checkOutMinute}`;

  return (
    <div className="px-4">
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h1 className="text-base font-bold">Today's Activity</h1>
      <div className="flex items-center justify-between gap-3">
        <EmployeeActivityIcon
          icons="Clock9"
          title={
            getAttendanceCheckIn?.data?.length ? checkInFullClock : "--:--"
          }
          description="Check in"
        />
        <EmployeeActivityIcon icons="TimerReset" description="Working Hours">
          {getAttendanceCheckIn?.data?.at(-1) ? (
            <Countdown
              date={
                (getAttendanceCheckIn?.data?.at(-1)?.createdAt?.getTime() ??
                  0) + 28800000
              }
              renderer={Renderer}
              autoStart
            />
          ) : (
            <span className={cn("text-sm font-bold text-gray-900")}>
              --:--:--
            </span>
          )}
        </EmployeeActivityIcon>
        <EmployeeActivityIcon
          icons="Clock6"
          title={
            getAttendanceCheckOut?.data?.length ? checkOutFullClock : "--:--"
          }
          description="Check Out"
        />
      </div>
    </div>
  );
};

export default EmployeeActivity;
