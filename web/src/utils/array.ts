export function sortByDate(data, key: string) {
  return data.sort((x, y) => +new Date(x[key]) - +new Date(y[key]))
}

type Filters = {
  [key: string]: (value: unknown) => boolean
}

/**
 * Filters an array of objects using custom predicates.
 * From: https://gist.github.com/jherax/f11d669ba286f21b7a2dcff69621eb72
 *
 * Example:
 * ```ts
 * const data = [{ title: 'Title 1', title: 'Title 2 }]
 *
 * filterArray(data, {
 *  title: (t: string) => String(t).includes(event.target.value),
 * })
 * ```
 *
 * @param  {Array}  array: the array to filter
 * @param  {Object} filters: an object with the filter criteria
 * @return {Array}
 */
export function filterArray<T>(array: Array<T>, filters: Filters) {
  const filterKeys = Object.keys(filters)
  return array.filter((item) => {
    // validates all filter criteria
    return filterKeys.every((key) => {
      // ignores non-function predicates
      if (typeof filters[key] !== 'function') return true
      return filters[key](item[key])
    })
  })
}

export function arrayTransformProperty<T>(items: Array<T>, prop: string) {
  const array = items.map((p) => {
    let result = null
    Object.entries(p).forEach(([key, value]) => {
      if (key === prop) {
        result = value
      }
    })

    return result
  })

  return array
}
