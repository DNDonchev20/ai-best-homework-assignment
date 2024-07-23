-- DropForeignKey
ALTER TABLE "HomeworkSubmissions" DROP CONSTRAINT "HomeworkSubmissions_homeworkId_fkey";

-- DropForeignKey
ALTER TABLE "HomeworkSubmissions" DROP CONSTRAINT "HomeworkSubmissions_studentId_fkey";

-- AlterTable
ALTER TABLE "HomeworkSubmissions" ALTER COLUMN "filePath" DROP NOT NULL;
