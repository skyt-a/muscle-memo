import { prisma } from '@/lib/prisma/server'
import { createClient } from '@/lib/supabase/server'
import { toFormattedDate } from '@/utils/date'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function MemoView({
  params,
}: {
  params: { exerciseDate: String }
}) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  const user = await prisma.user.findUnique({
    where: {
      auth_id: data.user?.id,
    },
  })
  if (!user) {
    redirect('/login')
  }
  const [year, month, day] = params.exerciseDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)
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
