import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const watchLaterRouter = createTRPCRouter({
  addWatchLater: protectedProcedure
    .input(
      z.object({
        type: z.string(),
        title: z.string(),
        imageUrl: z.string(),
        malId: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const { type, title, imageUrl, malId } = input;


      return ctx.prisma.watchLater.create({
        
        data: {
          type: type as string,
          title: title as string,
          imageUrl: imageUrl as string,
          malId: malId as number,
          user: {
            connect: {
              id: userId as string,
            },
          },
        },
      });
    }),

  getWatchLater: protectedProcedure.query(({ ctx }) => {

    return ctx.prisma.watchLater.findMany({
      where: {
        userId:ctx?.session?.user.id as string
      },
    });
  }),

  deleteWatchLater:protectedProcedure.input(z.object({ malId:z.number() })).mutation(({ ctx,input })=>{

    return ctx.prisma.watchLater.delete({
        where:{
            malId_userId:{
                userId:ctx.session?.user?.id as string,
                malId:input?.malId 

            }
        }
    })
  })
});
