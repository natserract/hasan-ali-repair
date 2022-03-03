import format from 'date-fns/format'

type DateFormat = 'MMMM dd, yyyy' | 'dd MMM yyyy' | string

/**
 * @see https://date-fns.org/docs/format
 */
export const parseDate = (
  date: number | Date,
  dateFormat: DateFormat = 'dd MMM yyyy'
) => {
  if (date) {
    const newDate = new Date(date).toDateString()

    return format(new Date(newDate), dateFormat)
  }
}

export const timeStamp = () => {
  return new Date().getTime()
}

/**
 * Time Conversion AM/PM
 *
 * From: https://gist.github.com/Cihatata/ad13d4228840da8e2c32e830eebb2650
 */
export const timeConversion = (s) => {
  const ampm = s.slice(-2)
  const hours = Number(s.slice(0, 2))
  const time = s.slice(0, -2)

  if (ampm === 'AM') {
    if (hours === 12) {
      // 12am edge-case
      return time.replace(s.slice(0, 2), '00')
    }
    return time
  } else if (ampm === 'PM') {
    if (hours !== 12) {
      return time.replace(s.slice(0, 2), String(hours + 12))
    }
    return time // 12pm edge-case
  }
  return 'Error: AM/PM format is not valid'
}

const convertDigits = (value: number, digit = 2) => {
  const str = String(value)
  const start = `0`

  return str.length < digit ? `${start}${value}` : str
}

export const getCurrentTime = (now: Date) => {
  const hours = convertDigits(now.getHours())
  const minutes = convertDigits(now.getMinutes())
  const seconds = convertDigits(now.getSeconds())

  return `${hours}:${minutes}:${seconds}`
}

export const getScalarDate = () => {
  const now = new Date()
  const date = parseDate(now, 'yyyy-MM-dd')
  const time = getCurrentTime(now)

  return `${date}T${time}Z`
}
