
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { prisma } from "@/lib/prisma/server";
import { toISOStringWithTimezone } from "@/utils/date";
import {
  DailyExercise,
  Exercise,
  ExerciseMemo,
  ExerciseSet,
  User,
} from "@prisma/client";

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
  return (
    <form
      action={async (form: FormData) => {
        "use server";
        const weight = Number(form.get("weight"));
        const reps = Number(form.get("reps"));
        if (!dailyExercise) {
          await prisma.dailyExercise.create({
            data: {
              day: toISOStringWithTimezone(new Date()),
              exercises: {
                create: {
                  exerciseId: exercise?.id,
                  set: {
                    create: {
                      exerciseId: exercise?.id,
                      weight,
                      reps,
                    },
                  },
                },
              },
              userId: user?.id,
            },
          });
        } else {
          if (exerciseMemo && targetSet) {
            await prisma.dailyExercise.update({
              where: {
                id: dailyExercise?.id,
              },
              data: {
                exercises: {
                  id: exerciseMemo?.id,
                  update: {
                    data: {
                      set: {
                        update: {
                          exerciseId: exercise?.id,
                          weight,
                          reps,
                        },
                      },
                    },
                    where: {
                      id: targetSet?.id,
                    },
                  },
                },
              },
            });
          } else if (exerciseMemo && !targetSet) {
            await prisma.dailyExercise.update({
              where: {
                id: dailyExercise?.id,
              },
              data: {
                exercises: {
                  update: {
                    data: {
                      set: {
                        create: {
                          exerciseId: exercise?.id,
                          weight,
                          reps,
                        },
                      },
                    },
                    where: {
                      id: exerciseMemo?.id,
                    },
                  },
                },
              },
            });
          }
        }
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
