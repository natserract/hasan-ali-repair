import { createElement } from 'react'
import { UserContextProvider } from './user/context'

export const GqlWrapper: React.FC<{}> = ({ children }) => {
  return createElement(UserContextProvider, null, children)
}
