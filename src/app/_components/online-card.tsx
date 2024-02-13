import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import React from "react";
import { dummyNews } from "@/constants/dummy-news";
import { Card } from "@/components/ui/card";

const OnlineCard = () => {
  return (
    <>
      <h1 className="text-md font-bold">Online</h1>
      <Card className="mb-10 flex w-full flex-row items-center justify-center rounded-xl p-4">
        <AnimatedTooltip items={dummyNews} />
      </Card>
    </>
  );
};

export default OnlineCard;
