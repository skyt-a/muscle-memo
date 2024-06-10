'use client'

import { Accordion, AccordionItem } from '@nextui-org/accordion'
import { ExerciseSet } from '@prisma/client'
import styled from './prevExerciseView.module.css'

type Props = {
  day: string
  exerciseSet: ExerciseSet[]
}

export const PrevExerciseView = ({ day, exerciseSet }: Props) => {
  return (
    <Accordion>
      <AccordionItem
        title={`${day} (max: ${Math.max(...exerciseSet.map((set) => set.weight ?? 0))}kg)`}
      >
        <ul>
          {exerciseSet.map((set, i) => {
            return (
              <li key={set.id}>
                <section>
                  <h3>{i + 1}セット目</h3>
                  <div key={set.id} className={styled.item}>
                    <p>{set.weight}kg</p>
                    <p>{set.reps}回</p>
                  </div>
                </section>
              </li>
            )
          })}
        </ul>
      </AccordionItem>
    </Accordion>
  )
}
