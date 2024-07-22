/*
  Warnings:

  - You are about to drop the column `subjectId` on the `Homeworks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Homeworks" DROP CONSTRAINT "Homeworks_subjectId_fkey";

-- AlterTable
ALTER TABLE "Homeworks" DROP COLUMN "subjectId";
