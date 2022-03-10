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
