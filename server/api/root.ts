import { favoriteRouter } from "./routers/favorite";
import { watchLaterRouter } from "./routers/watchLater";
import { createTRPCRouter } from "./trpc";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    favorite:favoriteRouter,
    watchLater:watchLaterRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;