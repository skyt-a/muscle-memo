'use client'

import { CreateExercise } from '@/app/(afterAuthed)/exercise/components/CreateExercise'
import { deleteExerciseAction } from '@/app/(afterAuthed)/exercise/components/action'
import { Button } from '@/components/ui/button'
import { nowDate } from '@/utils/date'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { Exercise, Parts, User } from '@prisma/client'
import Link from 'next/link'
import toast from 'react-hot-toast'
import styled from './ExerciseAccordion.module.css'

type Props = {
  parts: Parts[]
  exercises: Exercise[]
  user: User
}

export const ExerciseAccordions = ({ parts, exercises, user }: Props) => {
  const now = nowDate()
  const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
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
                      <Button
                        onClick={async () => {
                          await deleteExerciseAction(e.id)
                          toast('エクササイズの削除が完了しました')
                        }}
                        size="sm"
                        variant="flat"
                      >
                        ×
                      </Button>
                    </li>
                  ))}
              </ul>
            </>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}
