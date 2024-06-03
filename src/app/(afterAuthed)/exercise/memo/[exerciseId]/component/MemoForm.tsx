'use client'
import {
  deleteExerciseSetAction,
  exerciseMemoUpdateAction,
} from '@/app/(afterAuthed)/exercise/memo/[exerciseId]/component/action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DailyExercise,
  Exercise,
  ExerciseMemo,
  ExerciseSet,
  User,
} from '@prisma/client'
import { createRef } from 'react'
import toast from 'react-hot-toast'
import styled from './MemoForm.module.css'

type Props = {
  dailyExercise: DailyExercise | null
  exercise: Exercise
  user: User
  targetSet?: ExerciseSet
  exerciseMemo?: ExerciseMemo | null
  date: Date
}

export const MemoForm = ({
  dailyExercise,
  exerciseMemo,
  exercise,
  user,
  targetSet,
  date,
}: Props) => {
  const ref = createRef<HTMLFormElement>()
  return (
    <form
      ref={ref}
      action={async (form: FormData) => {
        console.log(date)
        await exerciseMemoUpdateAction(
          form,
          dailyExercise,
          exercise,
          user,
          exerciseMemo ?? null,
          targetSet ?? null,
          date,
        )
        toast('エクササイズメモの追加が完了しました')
        ref.current?.reset()
      }}
    >
      <div className={styled['input-wrapper']}>
        <div className={styled.input}>
          <Input
            type="number"
            name="weight"
            placeholder="重量"
            defaultValue={String(targetSet?.weight ?? 0)}
          />
          kg
        </div>
        <div className={styled.input}>
          <Input
            type="number"
            name="reps"
            placeholder="回数"
            defaultValue={String(targetSet?.reps ?? 0)}
          />
          reps
        </div>
      </div>
      <div className={styled['button-wrapper']}>
        {targetSet && (
          <Button
            variant="light"
            size="sm"
            type="button"
            onClick={async () => {
              await deleteExerciseSetAction(
                targetSet.id,
                exercise.id,
                dailyExercise?.day,
              )
              toast('エクササイズメモの削除が完了しました')
            }}
          >
            削除
          </Button>
        )}
        <Button variant="solid" type="submit" size="sm" className="mt-4">
          {!targetSet ? '登録' : '更新'}
        </Button>
      </div>
    </form>
  )
}
