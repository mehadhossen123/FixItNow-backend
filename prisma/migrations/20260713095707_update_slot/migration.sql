-- AlterTable
ALTER TABLE "technician" ADD COLUMN     "slots" TEXT[] DEFAULT ARRAY[]::TEXT[];
