/*
  Warnings:

  - Added the required column `exerciseId` to the `ExerciseMemo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciseMemo" ADD COLUMN     "exerciseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ExerciseMemo" ADD CONSTRAINT "ExerciseMemo_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
