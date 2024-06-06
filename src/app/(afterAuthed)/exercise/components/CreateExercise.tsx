'use client'
import { CreateExerciseDialog } from '@/app/(afterAuthed)/exercise/components/CreateExerciseDialog'
import { Button } from '@/components/ui/button'
import { useDisclosure } from '@nextui-org/modal'
import { Parts, User } from '@prisma/client'

type Props = {
  partsId: Parts['id']
  userId: User['id']
}

export const CreateExercise = ({ partsId, userId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
      <Button onClick={onOpen} variant="ghost" size="sm">
        追加+
      </Button>
      <CreateExerciseDialog
        partsId={partsId}
        userId={userId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  )
}
