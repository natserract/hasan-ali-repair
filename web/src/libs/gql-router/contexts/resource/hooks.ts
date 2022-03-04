import { useCallback, useContext, useEffect, useState } from 'react'
import { useAccess } from '../access'
import { ResourceContext } from './context'
import { IResourceContext, IResourceItem } from './types'

type UseResourceType = {
  resources: IResourceContext['resources']
  currentResources: IResourceContext['resources'] | undefined
}

export const useResource = (): UseResourceType => {
  const { resources } = useContext(ResourceContext)
  const { currentRole, access } = useAccess()

  const [currentResources, setCurrentResources] = useState<typeof resources>()

  useEffect(() => {
    if (currentRole) {
      const isAccessEmpty = !access || !Object.values(access).length
      let newResources = resources

      if (!isAccessEmpty) {
        newResources = resources.filter((item) => {
          let entries: string[] = []
          Object.entries(access).forEach(([key, values]) => {
            if (key == currentRole) {
              entries = values as string[]
            }
          })

          return entries.includes(item.name)
        })
      }

      if (newResources.length) {
        setCurrentResources(newResources)
      }
    }
  }, [access, currentRole, resources])

  return {
    resources,
    currentResources,
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
