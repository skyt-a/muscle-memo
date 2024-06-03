'use client'

import { Calendar, DateValue } from '@nextui-org/calendar'
import { useRouter } from 'next/navigation'
import styled from './calendar.module.css'

type Props = {
  dates: Date[]
}

export const ExerciseCalendar = ({ dates }: Props) => {
  const isDateUnavailable = (date: DateValue) => {
    return !dates.some(
      (d) =>
        d.getFullYear() === date.year &&
        d.getMonth() + 1 === date.month &&
        d.getDate() === date.day,
    )
  }
  const router = useRouter()
  return (
    <div className={styled.wrapper}>
      <Calendar
        isDateUnavailable={isDateUnavailable}
        onChange={(value) => {
          router.push(
            `/exercise/memo/view/${value.year}-${value.month}-${value.day}`,
          )
        }}
      />
    </div>
  )
}
