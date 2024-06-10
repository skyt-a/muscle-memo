import { AddSetButton } from '@/app/(afterAuthed)/exercise/memo/view/[exerciseDate]/components/AddSetButton'
import { SetDeleteButton } from '@/app/(afterAuthed)/exercise/memo/view/[exerciseDate]/components/SetDeleteButton'
import { prisma } from '@/lib/prisma/server'
import { createClient } from '@/lib/supabase/server'
import { formattedDateToDate, toFormattedDate } from '@/utils/date'
import { Divider } from '@nextui-org/divider'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import styled from './page.module.css'

export default async function MemoView({
  params,
}: {
  params: { exerciseDate: string }
}) {
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
  const date = formattedDateToDate(params.exerciseDate)
  const targetDaily = await prisma.dailyExercise.findUnique({
    include: {
      exercises: {
        include: {
          exercise: true,
          set: true,
        },
      },
    },
    where: {
      day_userId: {
        day: toFormattedDate(date),
        userId: user.id,
      },
    },
  })
  return (
    <section className={styled.wrapper}>
      <h2 className={styled['exercise-title']}>
        {toFormattedDate(date, 'yyyy年MM月dd日')}のエクササイズ
      </h2>
      <ul className={styled.list}>
        {targetDaily?.exercises.map((exercise) => (
          <li key={exercise.id} className={styled.item}>
            <Link
              href={`/exercise/memo/${exercise.exerciseId}/${params.exerciseDate}`}
            >
              {exercise.exercise.name}
            </Link>
            <Divider />
            {exercise.set.map((set) => (
              <section key={set.id} className={styled['set-item']}>
                <p>{set.weight}kg</p>
                <p>{set.reps}回</p>
                <SetDeleteButton
                  id={set.id}
                  exerciseId={exercise.exerciseId}
                  day={params.exerciseDate}
                />
              </section>
            ))}
            <Divider />
            <div className={styled['button-wrapper']}>
              <AddSetButton
                exerciseId={exercise.exerciseId}
                exerciseDate={params.exerciseDate}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
