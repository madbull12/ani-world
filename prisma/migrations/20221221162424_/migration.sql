-- DropForeignKey
ALTER TABLE "Saved" DROP CONSTRAINT "Saved_favouriteAnimeId_fkey";

-- DropForeignKey
ALTER TABLE "Saved" DROP CONSTRAINT "Saved_watchLaterId_fkey";

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_favouriteAnimeId_fkey" FOREIGN KEY ("favouriteAnimeId") REFERENCES "FavouriteAnime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_watchLaterId_fkey" FOREIGN KEY ("watchLaterId") REFERENCES "WatchLater"("id") ON DELETE CASCADE ON UPDATE CASCADE;
