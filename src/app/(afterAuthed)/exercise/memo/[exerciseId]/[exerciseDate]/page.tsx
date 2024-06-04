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
      day: toFormattedDate(targetDate),
      exercises: {
        some: {
          exerciseId: exercise.id,
        },
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
  console.log('target', targetDate)
  return (
    <main className={styled.wrapper}>
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
            date={targetDate}
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
          date={targetDate}
        />
      </section>
    </main>
  )
}
