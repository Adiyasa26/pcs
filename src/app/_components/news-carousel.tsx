/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDateformat } from "@/lib/utils";

const dummyNews = [
  {
    id: "user_1",
    imageUrl: "",
    fullName: "Albert Einstein",
    createdAt: new Date(),
    report:
      "Investigate relativity theorm,writing the theory to math equation,prepare presentation",
  },
  {
    id: "user_2",
    imageUrl: "",
    fullName: "Nikola Tesla",
    createdAt: new Date(),
    report:
      "Create prototype of tesla coil,prove that AC current was not dengerous,prepare presentation",
  },
  {
    id: "user_2",
    imageUrl: "",
    fullName: "Thomas Alfa Edison",
    createdAt: new Date(),
    report:
      "Create prove that Tesla model is dengerous,create electrical system in the city using DC current,lobby the president",
  },
];

export function NewsCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  const shortcut = (value: string) =>
    value
      .split(" ")
      .map((v) => v?.[0])
      ?.join("");

  return (
    <>
      <h1 className="text-md font-bold">PCS News</h1>
      <Carousel
        plugins={[plugin.current]}
        className="mx-auto w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {dummyNews.map((v) => (
            <CarouselItem key={v?.id}>
              <div className="p-1">
                <Card className="rounded-2xl bg-white p-4">
                  <CardContent className="m-0 flex w-full flex-col gap-3 p-0">
                    <div className="m-0 flex w-full justify-between p-0">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={v?.imageUrl} />
                          <AvatarFallback>
                            {shortcut(v?.fullName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-rose-500">
                          <h1 className="text-sm font-bold">{v?.fullName}</h1>
                        </div>
                      </div>

                      <div className="flex flex-col text-slate-900">
                        <p className="text-sm font-thin italic">
                          {v?.createdAt?.toLocaleString("en-us", {
                            weekday: "long",
                          })}
                        </p>
                        <h1 className="text-sm font-normal">
                          {getDateformat({
                            date: v?.createdAt,
                            type: "dd MMMM yyyy",
                          })}
                        </h1>
                      </div>
                    </div>

                    <ul className="ml-2 list-inside list-disc text-slate-900">
                      {v?.report
                        ?.split(",")
                        ?.map((v, index) => <li key={index}>{v}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}

export default NewsCarousel;
