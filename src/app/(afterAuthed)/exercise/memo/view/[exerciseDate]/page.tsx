import { prisma } from '@/lib/prisma/server'
import { createClient } from '@/lib/supabase/server'
import { formattedDateToDate, toFormattedDate } from '@/utils/date'
import Link from 'next/link'
import { redirect } from 'next/navigation'

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
  const targetDaily = await prisma.dailyExercise.findFirst({
    include: {
      exercises: {
        include: {
          exercise: true,
        },
      },
    },
    where: {
      day: toFormattedDate(date),
      userId: user.id,
    },
  })
  return (
    <div>
      {targetDaily?.exercises.map((exercise) => (
        <Link
          href={`/exercise/memo/${exercise.exerciseId}/${params.exerciseDate}`}
          key={exercise.id}
        >
          {exercise.exercise.name}
        </Link>
      ))}
    </div>
  )
}
