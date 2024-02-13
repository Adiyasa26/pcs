import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const attendanceRouter = createTRPCRouter({
  type: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        type: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.db.attendance.findMany({
        where: {
          userId: input.userId,
          createdAt: {
            lte: new Date(),
          },
        },
      });

      if (data?.length < 2) {
        return ctx.db.attendance.create({
          data: {
            userId: input.userId,
            createdAt: new Date(),
            updatedAt: new Date(),
            attendanceType: input.type,
          },
        });
      } else {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),

  getSpecificType: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        today: z.string(),
        attendanceType: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.attendance.findMany({
        where: {
          attendanceType: input?.attendanceType,
          userId: input.userId,
          createdAt: {
            lte: new Date(input.today),
          },
        },
      });

      return data;
    }),
});
