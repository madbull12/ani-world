/*
  Warnings:

  - You are about to drop the `FavouriteAnime` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `WatchLater` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FavouriteAnime" DROP CONSTRAINT "FavouriteAnime_userId_fkey";

-- AlterTable
ALTER TABLE "WatchLater" ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "FavouriteAnime";

-- CreateTable
CREATE TABLE "Favourite" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "malId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Favourite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favourite_malId_userId_key" ON "Favourite"("malId", "userId");

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
