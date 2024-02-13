import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs";
import { getDateformat } from "@/lib/utils";

const CardEmployee = async () => {
  const authProfile = await currentUser();
  const descriptionDummy = "Frontend Developer";

  return (
    <Card className="rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 p-4">
      <CardContent className="m-0 flex w-full justify-between p-0">
        <div className="flex gap-2">
          <Avatar className="h-14 w-14">
            <AvatarImage src={authProfile?.imageUrl} />
            <AvatarFallback>{authProfile?.firstName}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-white">
            <h1 className="text-base font-bold">
              {authProfile?.firstName} {authProfile?.lastName}
            </h1>
            <p className="text-sm font-thin italic">{descriptionDummy}</p>
          </div>
        </div>
        <div className="flex flex-col text-white">
          <p className="text-sm font-thin italic">Member Since</p>
          <h1 className="text-lg font-bold">
            {getDateformat({ date: new Date(), type: "dd MMMM yyyy" })}
          </h1>
        </div>
      </CardContent>
      <CardFooter className="m-0 mt-3 p-0">
        <div className="flex flex-col text-white">
          <p className="text-xs font-thin">Location</p>
          <h1 className="text-md font-bold">Kantor Sahid</h1>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardEmployee;
