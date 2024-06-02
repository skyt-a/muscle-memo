"use client";

import { CreateExercise } from "@/app/(afterAuthed)/exercise/components/CreateExercise";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Exercise, Parts, User } from "@prisma/client";
import Link from "next/link";
import styled from "./ExerciseAccordion.module.css";
import { nowDate } from "@/utils/date";

type Props = {
  parts: Parts[];
  exercises: Exercise[];
  user: User;
};

export const ExerciseAccordions = ({ parts, exercises, user }: Props) => {
  const now = nowDate();
  const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  return (
    <>
      <Accordion>
        {parts.map((part) => (
          <AccordionItem title={part.name} key={part.id}>
            <>
              <CreateExercise partsId={part.id} userId={user.id} />
              <ul className={styled.list}>
                {exercises
                  .filter((e) => e.partsId === part.id)
                  .map((e) => (
                    <li key={e.id} className={styled.item}>
                      <Link href={`/exercise/memo/${e.id}/${today}`}>
                        {e.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
