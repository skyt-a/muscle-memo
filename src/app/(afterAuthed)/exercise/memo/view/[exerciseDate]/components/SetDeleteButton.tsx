'use client'
import { deleteExerciseSetAction } from '@/app/(afterAuthed)/exercise/memo/[exerciseId]/component/action'
import { ArchiveBoxXMarkIcon } from '@heroicons/react/16/solid'
import { Button } from '@nextui-org/react'
import toast from 'react-hot-toast'

type Props = {
  id: number
  exerciseId: number
  day: string | undefined
}

export const SetDeleteButton = ({ id, exerciseId, day }: Props) => {
  return (
    <Button
      onClick={async () => {
        await deleteExerciseSetAction(id, exerciseId, day)
        toast('セットを削除しました')
      }}
      isIconOnly
      variant="ghost"
      size="sm"
    >
      <ArchiveBoxXMarkIcon className="size-1 text-blue-500" />
    </Button>
  )
}
