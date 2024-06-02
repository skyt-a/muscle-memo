"use client";
import { Button } from "@/components/ui/Button";
import { Parts, User } from "@prisma/client";
import { useDisclosure } from "@nextui-org/modal";
import { CreateExerciseDialog } from "@/app/(afterAuthed)/exercise/components/CreateExerciseDialog";

type Props = {
  partsId: Parts["id"];
  userId: User["id"];
};

export const CreateExercise = ({ partsId, userId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  );
};
