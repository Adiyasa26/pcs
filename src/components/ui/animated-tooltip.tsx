"use client";

import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { type dummyNews } from "@/app/page";

export const AnimatedTooltip = ({ items }: { items: typeof dummyNews }) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );
  const handleMouseMove: React.MouseEventHandler<HTMLImageElement> = (
    event,
  ) => {
    const halfWidth = event?.target?.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  const shortcut = (value: string) =>
    value
      .split(" ")
      .map((v) => v?.[0])
      ?.join("");

  return (
    <>
      {items.map((item) => (
        <div
          className="group  relative -mr-2"
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="wait">
            {hoveredIndex !== null && hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -left-1/2 -top-16 z-50 flex translate-x-1/2  flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent " />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent " />
                <div className="relative z-30 text-base font-bold text-white">
                  {item.fullName}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex flex-col items-center gap-1">
            <Avatar
              onMouseMove={handleMouseMove}
              className="relative !m-0 h-14 w-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
            >
              <AvatarImage src={item?.imageUrl} />
              <AvatarFallback>{shortcut(item?.fullName)}</AvatarFallback>
            </Avatar>
            <div className="flex w-fit flex-col">
              <h1 className="relative z-30 w-fit text-xs font-medium text-slate-900">
                {item.fullName?.split(" ")?.at(0)}
              </h1>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
