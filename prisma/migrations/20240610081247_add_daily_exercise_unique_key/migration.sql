/*
  Warnings:

  - A unique constraint covering the columns `[day,userId]` on the table `DailyExercise` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DailyExercise_day_userId_key" ON "DailyExercise"("day", "userId");
