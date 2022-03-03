import * as CryptoJS from 'crypto-js'
import { decryptData, encryptData } from 'src/utils/encrypt'

const useHashPassword = (text: string) => {
  const salt = CryptoJS.lib.WordArray.random(128 / 8).toString()
  const hashPassword = encryptData(text)
  const decryptPassword = decryptData(hashPassword)

  return [hashPassword, salt, decryptPassword]
}

export { useHashPassword }
