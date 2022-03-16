const fs = require('fs')

const readFileSync = (path: string) => {
  const startPath = './api/src/templates'
  const fileContents = fs
    .readFileSync(`${startPath}/${path}`, {
      encoding: 'utf8',
    })
    .toString()
  return fileContents
}

export { readFileSync }
