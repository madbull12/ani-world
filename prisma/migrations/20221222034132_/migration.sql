/*
  Warnings:

  - You are about to drop the column `favouriteAnimeId` on the `Saved` table. All the data in the column will be lost.
  - You are about to drop the column `watchLaterId` on the `Saved` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[malId,userId]` on the table `FavouriteAnime` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[malId,userId]` on the table `WatchLater` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageUrl` to the `FavouriteAnime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `malId` to the `FavouriteAnime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `FavouriteAnime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `FavouriteAnime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `WatchLater` table without a default value. This is not possible if the table is not empty.
  - Added the required column `malId` to the `WatchLater` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `WatchLater` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `WatchLater` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Saved" DROP CONSTRAINT "Saved_favouriteAnimeId_fkey";

-- DropForeignKey
ALTER TABLE "Saved" DROP CONSTRAINT "Saved_watchLaterId_fkey";

-- DropIndex
DROP INDEX "Saved_favouriteAnimeId_key";

-- DropIndex
DROP INDEX "Saved_favouriteAnimeId_malId_key";

-- DropIndex
DROP INDEX "Saved_watchLaterId_key";

-- DropIndex
DROP INDEX "Saved_watchLaterId_malId_key";

-- AlterTable
ALTER TABLE "FavouriteAnime" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "malId" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Saved" DROP COLUMN "favouriteAnimeId",
DROP COLUMN "watchLaterId";

-- AlterTable
ALTER TABLE "WatchLater" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "malId" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FavouriteAnime_malId_userId_key" ON "FavouriteAnime"("malId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "WatchLater_malId_userId_key" ON "WatchLater"("malId", "userId");

-- AddForeignKey
ALTER TABLE "FavouriteAnime" ADD CONSTRAINT "FavouriteAnime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchLater" ADD CONSTRAINT "WatchLater_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
