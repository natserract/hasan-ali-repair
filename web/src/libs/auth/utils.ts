import jwt from 'jsonwebtoken'

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SIGN_KEY)
      resolve(decoded)
    } catch (err) {
      reject(err)
    }
  })
}

export { verifyToken }
