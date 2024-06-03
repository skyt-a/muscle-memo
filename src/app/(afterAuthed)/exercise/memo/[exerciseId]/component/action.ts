'use server'
import { prisma } from '@/lib/prisma/server'
import { nowDate, toISOStringWithTimezone } from '@/utils/date'
import {
  DailyExercise,
  Exercise,
  ExerciseMemo,
  ExerciseSet,
  User,
} from '@prisma/client'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { revalidatePath } from 'next/cache'

export const exerciseMemoUpdateAction = async (
  form: FormData,
  dailyExercise: DailyExercise | null,
  exercise: Exercise,
  user: User,
  exerciseMemo: ExerciseMemo | null,
  set: ExerciseSet | null,
) => {
  const weight = Number(form.get('weight'))
  const reps = Number(form.get('reps'))
  if (!dailyExercise) {
    await prisma.dailyExercise.create({
      data: {
        day: toISOStringWithTimezone(nowDate()),
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
    })
  } else {
    if (exerciseMemo && set) {
      await prisma.dailyExercise.update({
        where: {
          id: dailyExercise?.id,
        },
        data: {
          exercises: {
            update: {
              data: {
                set: {
                  update: {
                    where: {
                      id: set?.id,
                    },
                    data: {
                      weight,
                      reps,
                    },
                  },
                },
              },
              where: {
                id: exerciseMemo?.id,
              },
            },
          },
        },
      })
    } else if (exerciseMemo && !set) {
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
      })
    }
    revalidatePath(
      `/exercise/memo/${exercise.id}/${format(
        dailyExercise?.day ?? nowDate(),
        'yyyy-M-d',
        { locale: ja },
      )}`,
    )
  }
}

export const deleteExerciseSetAction = async (
  id: number,
  exerciseId: number,
  day: Date | undefined,
) => {
  await prisma.exerciseSet.delete({
    where: {
      id,
    },
  })
  revalidatePath(
    `/exercise/memo/${exerciseId}/${format(day ?? nowDate(), 'yyyy-M-d', {
      locale: ja,
    })}`,
  )
}
