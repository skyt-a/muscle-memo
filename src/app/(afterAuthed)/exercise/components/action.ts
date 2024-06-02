"use server";

import { prisma } from "@/lib/prisma/server";
import { RegisterType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createExerciseAction = async (form: FormData) => {
  const name = form.get("name") as string;
  const partsId = Number(form.get("partsId"));
  const userId = Number(form.get("userId"));
  await prisma.exercise.create({
    data: {
      name,
      partsId,
      registerType: RegisterType.Original,
      userId,
    },
  });
  revalidatePath("/exercise");
};
