/*
  Warnings:

  - The primary key for the `FavouriteAnime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `FavouriteAnime` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `FavouriteAnime` table. All the data in the column will be lost.
  - You are about to drop the column `malId` on the `FavouriteAnime` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `FavouriteAnime` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `FavouriteAnime` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `FavouriteAnime` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "FavouriteAnime_malId_userEmail_key";

-- AlterTable
ALTER TABLE "FavouriteAnime" DROP CONSTRAINT "FavouriteAnime_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "imageUrl",
DROP COLUMN "malId",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
DROP COLUMN "userEmail",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "FavouriteAnime_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "FavouriteAnime_id_seq";

-- CreateTable
CREATE TABLE "Saved" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "malId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "favouriteAnimeId" TEXT NOT NULL,
    "watchLaterId" TEXT NOT NULL,

    CONSTRAINT "Saved_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchLater" (
    "id" TEXT NOT NULL,

    CONSTRAINT "WatchLater_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Saved_favouriteAnimeId_key" ON "Saved"("favouriteAnimeId");

-- CreateIndex
CREATE UNIQUE INDEX "Saved_watchLaterId_key" ON "Saved"("watchLaterId");

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_favouriteAnimeId_fkey" FOREIGN KEY ("favouriteAnimeId") REFERENCES "FavouriteAnime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_watchLaterId_fkey" FOREIGN KEY ("watchLaterId") REFERENCES "WatchLater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
