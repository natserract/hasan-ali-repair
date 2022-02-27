import { useCallback, useContext } from 'react'
import { ResourceContext } from './context'
import { IResourceContext, IResourceItem } from './types'

type UseResourceType = {
  resources: IResourceContext['resources']
}

export const useResource = (): UseResourceType => {
  const context = useContext(ResourceContext)

  return {
    resources: context.resources,
  }
}

type useResourceWithRouteType = () => (route: string) => IResourceItem
export const useResourceWithRoute: useResourceWithRouteType = () => {
  const { resources } = useContext(ResourceContext)

  const resourceWithRoute = useCallback(
    (route) => {
      const resource = resources.find(function (p) {
        return p.route === route
      })

      if (!resource) {
        const resourceWithName = resources.find(function (p) {
          return p.name === route
        })

        return resourceWithName != null
          ? resourceWithName
          : {
              name: route,
              route: route,
            }
      }

      return resource
    },
    [resources]
  )

  return resourceWithRoute
}
