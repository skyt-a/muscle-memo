import { PrevExerciseView } from '@/app/(afterAuthed)/exercise/memo/[exerciseId]/[exerciseDate]/components/PrevExerciseView'
import { MemoForm } from '@/app/(afterAuthed)/exercise/memo/[exerciseId]/component/MemoForm'
import { prisma } from '@/lib/prisma/server'
import { createClient } from '@/lib/supabase/server'
import { formattedDateToDate, toFormattedDate } from '@/utils/date'
import { redirect } from 'next/navigation'
import styled from './page.module.css'

export default async function Memo({
  params,
}: {
  params: { exerciseId: number; exerciseDate: string }
}) {
  const targetDate = formattedDateToDate(params.exerciseDate)
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  const user = await prisma.user.findUnique({
    where: {
      auth_id: data.user?.id,
    },
  })
  if (!user) {
    redirect('/login')
  }
  const exercise = await prisma.exercise.findUniqueOrThrow({
    where: {
      id: Number(params.exerciseId),
    },
  })
  const prevExerciseMemo = await prisma.dailyExercise.findFirst({
    include: {
      exercises: {
        include: {
          set: true,
        },
      },
    },
    where: {
      day: {
        not: toFormattedDate(targetDate),
      },
      exercises: {
        some: {
          exerciseId: Number(params.exerciseId),
        },
      },
    },
    orderBy: {
      day: 'desc',
    },
  })
  console.log('prevExerciseMemo', prevExerciseMemo?.exercises[0].set)
  const dailyExercise = await prisma.dailyExercise.findUnique({
    include: {
      exercises: {
        include: {
          set: true,
        },
      },
    },
    where: {
      day_userId: {
        userId: user.id,
        day: toFormattedDate(targetDate),
      },
    },
  })
  const targetExerciseMemo = dailyExercise?.id
    ? await prisma.exerciseMemo.findFirst({
        include: {
          set: true,
        },
        where: {
          dailyExerciseId: dailyExercise?.id,
        },
      })
    : null
  return (
    <main className={styled.wrapper}>
      <h2>今日の{exercise.name}</h2>
      {targetExerciseMemo?.set.map((s, i) => (
        <section key={s.id} className={styled.section}>
          <h3>{i + 1}セット目</h3>
          <div className={styled.inner}>
            <MemoForm
              dailyExercise={dailyExercise}
              exercise={exercise}
              user={user}
              targetSet={s}
              exerciseMemo={targetExerciseMemo}
              key={s.id}
              date={targetDate}
            />
          </div>
        </section>
      ))}
      <section>
        <h3>新規追加</h3>
        <div className={styled.inner}>
          <MemoForm
            dailyExercise={dailyExercise}
            exercise={exercise}
            user={user}
            exerciseMemo={targetExerciseMemo}
            date={targetDate}
          />
        </div>
      </section>
      {prevExerciseMemo && (
        <section className={styled['prev-section']}>
          <h3>前回の{exercise.name}</h3>
          <PrevExerciseView
            day={prevExerciseMemo?.day}
            exerciseSet={
              prevExerciseMemo.exercises.find(
                (exercise) => exercise.exerciseId === Number(params.exerciseId),
              )?.set ?? []
            }
          />
        </section>
      )}
    </main>
  )
}
