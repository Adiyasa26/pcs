import { Icon } from "@/components/custom/Icon/Icon";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import React from "react";

interface NotificationCardProps {
  className?: string;
}

const NotificationCard = (props: NotificationCardProps) => {
  return (
    <div className={cn("relative flex gap-3 px-4 py-3", props?.className)}>
      <div className="absolute right-4 top-3">
        <p className="text-xs font-normal text-slate-600">Today</p>
      </div>
      <div className="relative max-h-[3rem] min-h-[3rem] min-w-[3rem] max-w-[3rem] rounded-md bg-gray-300">
        <div className="absolute bottom-0 right-0 flex h-5 w-5 translate-x-[4px] translate-y-[4px] items-center justify-center rounded-full bg-red-500">
          <Icon name="X" className="h-3 w-3 text-white" />
        </div>
      </div>
      <div className="flex flex-col gap-1 text-slate-900">
        <h1 className="text-sm font-bold">Check in Gagal</h1>
        <p className="text-xs font-normal text-slate-600">
          Silahkan hubungi Supervisor kamu untuk mendapatkan bantuan Check In
          kembali
        </p>
      </div>
    </div>
  );
};

const NotificationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Icon name="BellDot" className="h-7 w-7" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full px-0" withoutPrimitiveClose>
        <SheetHeader className="h-18 flex w-full flex-row items-center gap-2 space-y-0 px-4">
          <SheetClose asChild>
            <Button variant="ghost" className="w-fit px-1 py-1">
              <Icon name="ArrowLeft" className="h-7 w-7" />
            </Button>
          </SheetClose>
          <h1 className="text-2xl font-extrabold text-rose-600">
            Notification
          </h1>
        </SheetHeader>
        <div className="flex flex-col">
          {new Array(5)
            .fill(0)
            ?.map((_, idx) => idx)
            ?.map((v) => (
              <NotificationCard
                key={v}
                className={v % 2 === 0 ? "bg-slate-200" : "bg-white"}
              />
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSheet;
