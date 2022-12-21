-- DropForeignKey
ALTER TABLE "Saved" DROP CONSTRAINT "Saved_favouriteAnimeId_fkey";

-- DropForeignKey
ALTER TABLE "Saved" DROP CONSTRAINT "Saved_watchLaterId_fkey";

-- AlterTable
ALTER TABLE "Saved" ALTER COLUMN "favouriteAnimeId" DROP NOT NULL,
ALTER COLUMN "watchLaterId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_favouriteAnimeId_fkey" FOREIGN KEY ("favouriteAnimeId") REFERENCES "FavouriteAnime"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_watchLaterId_fkey" FOREIGN KEY ("watchLaterId") REFERENCES "WatchLater"("id") ON DELETE SET NULL ON UPDATE CASCADE;
