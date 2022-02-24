import { createElement } from 'react'
import { LayoutProvider } from './layout'

export const ContextProvider: React.FC<{}> = ({ children }) => {
  return createElement(LayoutProvider, null, children)
}
