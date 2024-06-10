/*
  Warnings:

  - A unique constraint covering the columns `[dailyExerciseId]` on the table `ExerciseMemo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ExerciseMemo_dailyExerciseId_key" ON "ExerciseMemo"("dailyExerciseId");
