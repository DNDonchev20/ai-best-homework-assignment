-- AlterTable
ALTER TABLE "Homeworks" ALTER COLUMN "dueDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "isActivated" BOOLEAN NOT NULL DEFAULT true;
