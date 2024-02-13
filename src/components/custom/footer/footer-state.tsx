"use client";

import { Button } from "@/components/ui/button";
import { cn, getDateformat } from "@/lib/utils";
import React, { useMemo } from "react";
import { Icon } from "../Icon/Icon";
import { usePathname } from "next/navigation";
import { api } from "@/trpc/react";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Setting = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="aspect-square h-16 w-16 rounded-full p-0"
        >
          <Icon name="Settings" className={cn("h-8 w-8 text-slate-400")} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <Button asChild>
            <Link href="/user-profile">Account Settings</Link>
          </Button>
          <SignOutButton>
            <Button variant="destructive">Sign Out</Button>
          </SignOutButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const FooterState = () => {
  const pathname = usePathname();
  const user = useUser();
  const today = getDateformat({ date: new Date(), type: "yyyy-MM-dd" });
  const utils = api.useUtils();

  const getAttendance = api.attendace.getSpecificType.useQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      userId: user?.user?.id!,
      today: today,
    },
    {
      enabled: !!user?.user?.id,
    },
  );
  const createAttendance = api.attendace.type.useMutation({
    async onSuccess() {
      await utils.attendace.getSpecificType.invalidate();
    },
  });

  const isCheckedIn = useMemo(
    () => getAttendance?.data?.at(-1)?.attendanceType === 1,
    [getAttendance?.data],
  );

  const handleClick = () => {
    if (isCheckedIn && user?.user?.id) {
      createAttendance.mutate({
        userId: user?.user?.id,
        type: 2, // checkout
      });

      return;
    }

    if (user?.user?.id) {
      createAttendance.mutate({
        userId: user?.user?.id,
        type: 1, // checkin
      });
    }
  };

  return (
    <div className="grid w-full grid-cols-5 place-items-center justify-items-center">
      <Button
        variant="ghost"
        className="aspect-square h-16 w-16 rounded-full p-0"
        asChild
      >
        <Link href="/" className="aspect-square h-16 w-16 rounded-full p-0">
          <Icon
            name="Home"
            className={cn(
              "h-8 w-8",
              pathname === "/" ? "text-red-500" : "text-slate-400",
            )}
          />
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="aspect-square h-16 w-16 rounded-full p-0"
        disabled
      >
        <Icon name="CalendarCheck" className={cn("h-8 w-8 text-slate-400")} />
      </Button>
      <div className="relative h-full w-full">
        <Button
          variant="ghost"
          onClick={handleClick}
          disabled={getAttendance?.data?.length === 2}
          className={cn(
            "absolute left-1/2 top-0 aspect-square h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full disabled:bg-slate-500 disabled:opacity-100",
            isCheckedIn
              ? "bg-red-500 p-0 hover:bg-red-600 active:bg-red-600 "
              : "bg-emerald-500 p-0 hover:bg-emerald-600 active:bg-emerald-600",
          )}
        >
          <Icon
            name={isCheckedIn ? "LogOut" : "LogIn"}
            className={cn("h-8 w-8 text-white")}
          />
        </Button>
      </div>
      <Button
        variant="ghost"
        className="aspect-square h-16 w-16 rounded-full p-0"
        disabled
      >
        <Icon name="ScrollText" className={cn("h-8 w-8 text-slate-400")} />
      </Button>
      <Setting />
    </div>
  );
};

export default FooterState;
