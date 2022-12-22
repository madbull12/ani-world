/*
  Warnings:

  - You are about to drop the `Saved` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Saved" DROP CONSTRAINT "Saved_userId_fkey";

-- DropTable
DROP TABLE "Saved";
