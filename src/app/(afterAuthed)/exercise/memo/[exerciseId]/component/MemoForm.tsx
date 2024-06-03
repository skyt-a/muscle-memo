"use client";
import { exerciseMemoUpdateAction } from "@/app/(afterAuthed)/exercise/memo/[exerciseId]/component/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DailyExercise,
  Exercise,
  ExerciseMemo,
  ExerciseSet,
  User,
} from "@prisma/client";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { createRef } from "react";
import toast from "react-hot-toast";

type Props = {
  dailyExercise: DailyExercise | null;
  exercise: Exercise;
  user: User;
  targetSet?: ExerciseSet;
  exerciseMemo?: ExerciseMemo | null;
};

export const MemoForm = async ({
  dailyExercise,
  exerciseMemo,
  exercise,
  user,
  targetSet,
}: Props) => {
    const ref = createRef<HTMLFormElement>();
  return (
    <form
     ref={ref}
      action={async (form: FormData) => {
        await exerciseMemoUpdateAction(form, dailyExercise, exercise, user, exerciseMemo ?? null, targetSet ?? null);
        toast("エクササイズメモの追加が完了しました");
        ref.current?.reset();
      }}
    >
      <Input
        type="number"
        name="weight"
        placeholder="重量"
        defaultValue={String(targetSet?.weight ?? 0)}
      />
      <Input
        type="number"
        name="reps"
        placeholder="回数"
        defaultValue={String(targetSet?.weight ?? 0)}
      />
      <Button
        variant="solid"
        type="submit"
        size="lg"
        fullWidth
      >
        登録
      </Button>
    </form>
  );
};
