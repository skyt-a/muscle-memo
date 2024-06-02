import { prisma } from "@/lib/prisma/server";
import { RegisterType } from "@prisma/client";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import style from "./page.module.css";
import { ExerciseAccordions } from "@/app/(afterAuthed)/exercise/components/ExerciseAccordions";

export default async function Exercise() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  const user = await prisma.user.findUnique({
    where: {
      auth_id: data.user?.id,
    },
  });
  if (!user) {
    redirect("/login");
  }
  console.log(user);
  const parts = await prisma.parts.findMany({
    where: {
      OR: [
        {
          registerType: RegisterType.Preset,
        },
        {
          registerType: RegisterType.Original,
          userId: user.id,
        },
      ],
    },
  });
  const exercises = await prisma.exercise.findMany({
    where: {
      OR: [
        {
          registerType: RegisterType.Preset,
        },
        {
          registerType: RegisterType.Original,
          userId: user.id,
        },
      ],
    },
  });
  return (
    <main className={style.wrapper}>
      <ExerciseAccordions parts={parts} exercises={exercises} user={user} />
    </main>
  );
}


