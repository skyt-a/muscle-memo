'use client'

import { Button } from '@nextui-org/button'
import Link from 'next/link'

export const TodayExerciseButton = () => {
  return (
    <Button as={Link} href="/exercise">
      今日のトレーニングを追加
    </Button>
  )
}
