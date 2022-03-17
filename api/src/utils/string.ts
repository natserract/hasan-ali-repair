export const loopingHtmlTemplate = (str: string) => {
  return str.replaceAll(/,/g, '').trim()
}
