import * as CryptoJS from 'crypto-js'

export const encryptData = (data: string) => {
  try {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      process.env.SESSION_SECRET
    ).toString()
  } catch (error) {
    throw Error(error)
  }
}

export const decryptData = (data: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, process.env.SESSION_SECRET)
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }
    return data
  } catch (error) {
    throw Error(error)
  }
}
