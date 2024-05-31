import { Button } from "@/components/ui/button";
import * as Dialog from "@/components/ui/dialog";
import { FormLabel } from "@/components/ui/form-label";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma/server";
import { createClient } from "@/lib/supabase/server";
import { Parts, RegisterType, User } from "@prisma/client";
import { FC } from "react";
import { Stack } from "styled-system/jsx";

type Props = {
  partsId: Parts["id"];
  userId: User["id"];
};

export const CreateExerciseDialog: FC<Props> = async ({ partsId, userId }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="link">追加＋</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <form
            action={async (form: FormData) => {
              "use server";
              if (!user) {
                return;
              }
              const name = form.get("name") as string;
              await prisma.exercise.create({
                data: {
                  name,
                  partsId,
                  registerType: RegisterType.Original,
                  userId: user.id,
                },
              });
            }}
          >
            <Stack gap="8" p="6">
              <Stack gap="1">
                <Dialog.Title>エクササイズを追加</Dialog.Title>
                <Dialog.Description>
                  <FormLabel htmlFor="name">エクササイズ名</FormLabel>
                  <Input id="name" name="name" placeholder="エクササイズ名" />
                </Dialog.Description>
              </Stack>
              <Stack gap="3" direction="row" width="full">
                <Dialog.CloseTrigger asChild>
                  <Button variant="outline" width="full">
                    Cancel
                  </Button>
                </Dialog.CloseTrigger>
                <Button width="full" type="submit">
                  Confirm
                </Button>
              </Stack>
            </Stack>{" "}
          </form>

          {/* <Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
            <IconButton aria-label="Close Dialog" variant="ghost" size="sm">
              <XIcon />
            </IconButton>
          </Dialog.CloseTrigger> */}
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
