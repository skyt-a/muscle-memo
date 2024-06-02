import { ExerciseCalendar } from "@/app/(afterAuthed)/calendar/components/ExerciseCalendar";
import { prisma } from "@/lib/prisma/server";
import { createClient } from "@/lib/supabase/server";
import {Calendar, DateValue} from "@nextui-org/calendar";

export default async function CalendarPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  const user = await prisma.user.findUnique({
    where: {
      auth_id: data.user?.id,
    }
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
    }
  });
  return (
    <main>
         <ExerciseCalendar dates={dates.map(d => d.day)} />

    </main>
  );
}
