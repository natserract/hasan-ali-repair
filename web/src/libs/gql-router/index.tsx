import { createElement } from 'react'
import { IResourceContext } from './resource/types'
import { ResourceContextProvider } from './resource/context'

type GqlRouterProps = {} & IResourceContext

export const GqlRouter: React.FC<GqlRouterProps> = ({ children, resources }) => {
  return createElement(ResourceContextProvider, Object.assign({
    resources,
  }), children)
}
