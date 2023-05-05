import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const favoriteRouter = createTRPCRouter({
  addFavorite: protectedProcedure
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


      return ctx.prisma.favourite.create({
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

  getFavorites: protectedProcedure.query(({ ctx }) => {
    
    return ctx.prisma.favourite.findMany({
      where: {
        userId:ctx?.session?.user.id as string
      },
    });
  }),

  deleteFavourite:protectedProcedure.input(z.object({ malId:z.number() })).mutation(({ ctx,input })=>{

    return ctx.prisma.favourite.delete({
        where:{
            malId_userId:{
                userId:ctx.session?.user?.id as string,
                malId:input?.malId 

            }
        }
    })
  })
});
