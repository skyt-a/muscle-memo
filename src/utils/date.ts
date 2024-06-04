import { format, toZonedTime } from 'date-fns-tz'
import { ja } from 'date-fns/locale'

function zeroPadding(s: string): string {
  return ('0' + s).slice(-2)
}

export const nowDate = () => {
  return toZonedTime(new Date(), 'Asia/Tokyo')
}

export const toFormattedDate = (date: Date) => {
  return format(date, 'yyyy-MM-dd', { locale: ja })
}

export const formattedDateToDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}
