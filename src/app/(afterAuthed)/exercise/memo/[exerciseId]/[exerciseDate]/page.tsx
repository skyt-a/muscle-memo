import { prisma } from "@/lib/prisma/server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { toISOStringWithTimezone } from "@/utils/date";
import { MemoForm } from "@/app/(afterAuthed)/exercise/memo/[exerciseId]/component/MemoForm";

export default async function Memo({
  params,
}: {
  params: { exerciseId: number; exerciseDate: string };
}) {
  const [year, month, day] = params.exerciseDate.split("-").map(Number);
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const user = await prisma.user.findUnique({
    where: {
      auth_id: data.user?.id,
    },
  });
  if (!user) {
    redirect("/login");
  }
  const exercise = await prisma.exercise.findUniqueOrThrow({
    where: {
      id: Number(params.exerciseId),
    },
  });
  const dailyExercise = await prisma.dailyExercise.findFirst({
    include: {
      exercises: {
        include: {
          set: true,
        },
      },
    },
    where: {
      userId: user.id,
      day: toISOStringWithTimezone(new Date(year, month - 1, day)),
      exercises: {
        some: {
          exerciseId: exercise.id,
        },
      },
    },
  });
  console.log(dailyExercise);
  const targetExerciseMemo = dailyExercise?.id
    ? await prisma.exerciseMemo.findFirst({
        include: {
          set: true,
        },
        where: {
          dailyExerciseId: dailyExercise?.id,
        },
      })
    : null;
  return (
    <main>
      今日の{exercise.name}
      {targetExerciseMemo?.set.map((s, i) => (
        <section key={s.id}>
          <h3>{i + 1}セット目</h3>
          <MemoForm
            dailyExercise={dailyExercise}
            exercise={exercise}
            user={user}
            targetSet={s}
            exerciseMemo={targetExerciseMemo}
            key={s.id}
          />
        </section>
      ))}
      <section>
        <h3>新規追加</h3>
        <MemoForm
          dailyExercise={dailyExercise}
          exercise={exercise}
          user={user}
          exerciseMemo={targetExerciseMemo}
        />
      </section>
    </main>
  );
}
