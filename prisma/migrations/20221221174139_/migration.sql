/*
  Warnings:

  - A unique constraint covering the columns `[favouriteAnimeId,malId]` on the table `Saved` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[watchLaterId,malId]` on the table `Saved` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Saved_favouriteAnimeId_malId_key" ON "Saved"("favouriteAnimeId", "malId");

-- CreateIndex
CREATE UNIQUE INDEX "Saved_watchLaterId_malId_key" ON "Saved"("watchLaterId", "malId");
