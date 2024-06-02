"use client"
import { createExerciseAction } from "@/app/(afterAuthed)/exercise/components/action";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
} from "@nextui-org/modal";
import { Parts, User } from "@prisma/client";
import toast from "react-hot-toast";

type Props = {
  partsId: Parts["id"];
  userId: User["id"];
  isOpen: boolean,
  onClose: () => void,
};

export const CreateExerciseDialog =  ({ partsId, userId, isOpen, onClose }: Props) => {
  // const action = createExerciseAction(partsId, userId)
  return (
      <Modal isOpen={isOpen} onClose={onClose} size="lg" radius="md" title="エクササイズを追加">
      <ModalContent>
        <ModalHeader>エクササイズを追加</ModalHeader>
        <ModalBody>
        <form
          action={async (form: FormData) => {
            await createExerciseAction(form);
            toast("エクササイズを追加しました");
          }}
        >
          <div>
            <Input id="name" name="name" placeholder="エクササイズ名" />
            <input type="hidden" name="partsId" value={String(partsId)} hidden/>
            <input type="hidden" name="userId" value={String(userId)} hidden/>
            <Button variant="solid" fullWidth>
              Cancel
            </Button>
            <Button fullWidth type="submit">
              Confirm
            </Button>
          </div>
        </form>
        </ModalBody>
        </ModalContent>
      </Modal>
  );
};
