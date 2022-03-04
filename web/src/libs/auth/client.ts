import axios from 'axios'
import jwt from 'jsonwebtoken'
import { API_URL } from 'src/constant/endpoint'
import { storageKey } from './config'
import { CurrentUser } from './hooks'
import { browserHistory } from '../gql-router/utils/history'

const AuthClient = {
  type: 'custom',
  login: ({ email, password }) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/login`, {
          params: {
            email,
            password,
          },
        })
        .then(({ data: { data } }) => {
          localStorage.setItem(storageKey, JSON.stringify(data))
          return resolve(data)
        })
        .catch(reject)
    })
  },
  signup: ({ name, email, password, user_type, address, phone_number }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/signup`, {
          name,
          email,
          password,
          user_type,
          address,
          phone_number,
        })
        .then(({ data: { data } }) => {
          localStorage.setItem(storageKey, JSON.stringify(data))
          return resolve(resolve)
        })
        .catch(reject)
    })
  },
  logout: () => {
    const item = localStorage.getItem(storageKey)
    const token = JSON.parse(item || JSON.stringify({})).accessToken

    return axios
      .put(`${API_URL}/logout`, {
        token,
      })
      .finally(() => {
        browserHistory.push(window.origin)
        localStorage.removeItem(storageKey)
      })
  },
  getToken: () => {
    const item = localStorage.getItem(storageKey)
    const token = JSON.parse(item || JSON.stringify({})).accessToken

    const decoded = jwt.decode(token)
    if (!decoded) {
      localStorage.removeItem(storageKey)
      throw Error('Invalid AccessToken')
    }
    return token
  },
  getCurrentUser: (): CurrentUser => {
    const item = localStorage.getItem(storageKey)
    const token = JSON.parse(item || JSON.stringify({})).accessToken

    const data = jwt.decode(token) as CurrentUser
    return data
  },
  getUserMetadata: () => {
    return JSON.parse(localStorage.getItem(storageKey) || JSON.stringify({}))
  },
}

export { AuthClient }
