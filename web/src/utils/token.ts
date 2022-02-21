import { removeItem } from './storage'

export const removeToken = () => {
  removeItem('token')
  sessionStorage.removeItem('token')
}
