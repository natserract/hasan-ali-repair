export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const dates = () => {
  const results = []

  for (let i = 1; i <= 30; i++) {
    results.push(i)
  }

  return results
}
