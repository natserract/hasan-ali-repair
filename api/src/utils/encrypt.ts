import * as CryptoJS from 'crypto-js'

export const useHashedPassword = (text: string) => {
  const salt = CryptoJS.lib.WordArray.random(128 / 8).toString()
  const hashPassword = CryptoJS.PBKDF2(text, salt, {
    keySize: 256 / 32
  }).toString()

  return {
    hashPassword,
    salt,
  }
}

export const comparePassword = (data: {
  text: string, salt: string
}, compared) => {
  const hashPassword = CryptoJS.PBKDF2(data.text, data.salt, {
    keySize: 256 / 32
  }).toString()

  return compared === hashPassword
}
