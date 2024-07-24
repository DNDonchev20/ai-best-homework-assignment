/*
  Warnings:

  - Added the required column `studentId` to the `Grades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Grades" ADD COLUMN     "studentId" TEXT NOT NULL;
