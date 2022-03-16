export const toCamelCase = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, _index) {
      return word.toUpperCase()
    })
    .replace(/\s+/g, ' ')
}

export function copyText(text) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()

  try {
    // Now that we've selected the anchor text, execute the copy command
    const successful = document.execCommand('copy')
    const message = successful ? 'successful' : 'unsuccessful'
    console.log(`Copy email command was ${message}`)
  } catch (error) {
    console.error(`Oops, unable to copy: ${error}`)
  }

  document.body.removeChild(textArea)
}

// Create slug from string
// From: https://gist.github.com/codeguy/6684588
export function stringToSlug(str: string) {
  str = str.replace(/^\s+|\s+$/g, '') // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
  const to = 'aaaaeeeeiiiioooouuuunc------'

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes

  return str
}
