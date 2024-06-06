'use client'
import { PlusIcon } from '@heroicons/react/16/solid'
import { Button } from '@nextui-org/button'
import Link from 'next/link'

type Props = {
  exerciseId: number
  exerciseDate: string
}

export const AddSetButton = ({ exerciseId, exerciseDate }: Props) => {
  return (
    <Button
      isIconOnly
      variant="ghost"
      as={Link}
      href={`/exercise/memo/${exerciseId}/${exerciseDate}`}
      size="sm"
    >
      <PlusIcon className="size-1" />
    </Button>
  )
}
