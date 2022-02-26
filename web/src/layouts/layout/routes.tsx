import { useCallback, useEffect, useRef, useState } from 'react'
import { useResource } from 'src/libs/gql-router/resource/hooks'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { IResource } from 'src/libs/gql-router/resource/types'
import NotFoundPage from 'src/pages/NotFoundPage'
import { useAuthState } from 'src/libs/auth/hooks'
import { adminTypes, clientTypes } from 'src/resources'
import { RouteHook } from 'src/routes'

type RouteHandlerInput = IResource

const RoutesHandler = () => {
  const { resources } = useResource()
  const { currentUser } = useAuthState()

  const routesRef = useRef([])
  const [routesList, setRoutesList] = useState([])
  const [isMenuReady, setIsMenuReady] = useState(false)

  const RouteHandler = useCallback((input: RouteHandlerInput) => {
    const { create, edit, list, pure, show, canDelete, route, name } = input

    const PureComponent = pure
    const ListComponent = list
    const CreateComponent = create
    const EditComponent = edit
    const ShowComponent = show

    if (ListComponent) {
      routesRef.current.push({
        exact: true,
        path: route ?? `/app/${name}`,
        component: () => (
          <div>
            {/* TODO: Table List */}
            <h2>List Wrapper</h2>

            <ListComponent name={name} />
          </div>
        ),
      })
    }

    if (PureComponent) {
      routesRef.current.push({
        exact: true,
        path: route ?? `/app/${name}`,
        component: () => <PureComponent name={name} />,
      })
    }

    setRoutesList(routesRef.current)
    setIsMenuReady(true)
  }, [])

  useEffect(() => {
    if (currentUser.user_type !== undefined) {
      const { user_type } = currentUser

      const currentResources = resources.filter((item) => {
        if (user_type === 'admin') {
          return adminTypes.includes(item.name)
        } else if (user_type === 'customer') {
          return clientTypes.includes(item.name)
        }
      })

      currentResources.map((item) => {
        RouteHandler(item)
      })
    }
  }, [RouteHandler, resources, currentUser])

  return (
    <Switch>
      {routesList.map((route, i) => (
        <Route
          key={i}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      ))}

      {isMenuReady && (
        <RouteHook component={NotFoundPage} path="*" onEnter={console.log} />
      )}
    </Switch>
  )
}

export default RoutesHandler
