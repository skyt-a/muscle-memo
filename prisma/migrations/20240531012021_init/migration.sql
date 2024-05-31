-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "auth_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "partsId" INTEGER NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseSet" (
    "id" SERIAL NOT NULL,
    "weight" DECIMAL(65,30),
    "reps" INTEGER NOT NULL,
    "description" TEXT,
    "exerciseId" INTEGER NOT NULL,
    "exerciseMemoId" INTEGER,

    CONSTRAINT "ExerciseSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseMemo" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "exercise_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dailyExerciseId" INTEGER,

    CONSTRAINT "ExerciseMemo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyExercise" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "day" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "DailyExercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_auth_id_key" ON "User"("auth_id");

-- CreateIndex
CREATE UNIQUE INDEX "Parts_id_key" ON "Parts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_id_key" ON "Exercise"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseSet_id_key" ON "ExerciseSet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseMemo_id_key" ON "ExerciseMemo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DailyExercise_id_key" ON "DailyExercise"("id");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "Parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseSet" ADD CONSTRAINT "ExerciseSet_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseSet" ADD CONSTRAINT "ExerciseSet_exerciseMemoId_fkey" FOREIGN KEY ("exerciseMemoId") REFERENCES "ExerciseMemo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseMemo" ADD CONSTRAINT "ExerciseMemo_dailyExerciseId_fkey" FOREIGN KEY ("dailyExerciseId") REFERENCES "DailyExercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyExercise" ADD CONSTRAINT "DailyExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
