/*
  Warnings:

  - You are about to drop the column `studentId` on the `Grades` table. All the data in the column will be lost.
  - Added the required column `teacherId` to the `Grades` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Grades" DROP CONSTRAINT "Grades_studentId_fkey";

-- AlterTable
ALTER TABLE "Grades" DROP COLUMN "studentId",
ADD COLUMN     "teacherId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
