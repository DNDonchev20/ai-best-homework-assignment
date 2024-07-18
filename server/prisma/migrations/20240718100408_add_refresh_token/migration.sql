/*
  Warnings:

  - You are about to drop the column `comments` on the `HomeworkSubmissions` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `HomeworkSubmissions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[homeworkSubmissionId]` on the table `Grades` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "HomeworkSubmissions" DROP COLUMN "comments",
DROP COLUMN "points",
ADD COLUMN     "feedback" TEXT;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "refreshToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Grades_homeworkSubmissionId_key" ON "Grades"("homeworkSubmissionId");
