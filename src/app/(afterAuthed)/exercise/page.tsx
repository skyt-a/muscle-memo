import * as Card from "@/components/ui/card";
import { css } from "styled-system/css";
import { prisma } from "@/lib/prisma/server";
import { RegisterType } from "@prisma/client";
import * as Accordion from "@/components/ui/accordion";
import { CreateExerciseDialog } from "@/app/(afterAuthed)/exercise/components/CreateExerciseDialog";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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
  console.log(exercises);
  return (
    <main className={wrapperStyle}>
      <Accordion.Root>
        {parts.map((part) => (
          <Accordion.Item key={part.id} value={String(part.id)}>
            <Accordion.ItemTrigger>{part.name}</Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <CreateExerciseDialog partsId={part.id} userId={user.id} />
              {exercises
                .filter((e) => e.partsId === part.id)
                .map((e) => (
                  <div>{e.name}</div>
                ))}
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </main>
  );
}

const wrapperStyle = css({
  width: "calc(100vw - 80px)",
  margin: "40px",
});
