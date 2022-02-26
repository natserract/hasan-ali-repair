import { createContext, createElement, useMemo } from 'react'
import { IResourceContext } from './types'

export const ResourceContext = createContext<IResourceContext>({
  resources: [],
})

export const ResourceContextProvider: React.FC<IResourceContext> = (props) => {
  const value = useMemo(
    () => ({
      resources: props.resources,
    }),
    [props.resources]
  )

  return createElement(ResourceContext.Provider, { value }, props.children)
}
