import { ExerciseCalendar } from '@/app/(afterAuthed)/calendar/components/ExerciseCalendar'
import { prisma } from '@/lib/prisma/server'
import { createClient } from '@/lib/supabase/server'
import { formattedDateToDate } from '@/utils/date'
import styled from './page.module.css'

export default async function CalendarPage() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  const user = await prisma.user.findUnique({
    where: {
      auth_id: data.user?.id,
    },
  })
  if (!user) {
    return <div>ユーザーが見つかりません</div>
  }
  const dates = await prisma.dailyExercise.findMany({
    select: {
      day: true,
    },
    where: {
      userId: user.id,
    },
  })
  return (
    <main className={styled.wrapper}>
      <ExerciseCalendar dates={dates.map((d) => formattedDateToDate(d.day))} />
    </main>
  )
}
