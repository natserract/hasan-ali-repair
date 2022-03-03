/* eslint-disable react/no-children-prop */
import { useCallback, useEffect, useRef, useState } from 'react'
import { IResourceItem, useResource } from '../resource'
import pluralize from 'pluralize'
import { Route, Switch } from 'react-router-dom'
import { RouteHook } from '../../helpers/routes'
import DefaultNotFoundPage from '../../pages/notfound'

type RouteHandlerInput = IResourceItem

type RouteComponentProps = {
  basePath?: string
  notFoundPage?: React.ComponentType<{}>
}

const RouteComponent: React.FC<RouteComponentProps> = ({
  basePath: routePath,
  notFoundPage: NotFoundPage,
}) => {
  const { currentResources } = useResource()

  const routesRef = useRef([])
  const [routesList, setRoutesList] = useState([])
  const [isMenuReady, setIsMenuReady] = useState(false)

  const RouteHandler = useCallback(
    (input: RouteHandlerInput) => {
      const {
        create,
        edit,
        list,
        pure,
        show,
        route,
        name,
        canCreate,
        canDelete,
        canEdit,
        canShow,
      } = input

      const PureComponent = pure
      const ListComponent = list
      const CreateComponent = create
      const EditComponent = edit
      const ShowComponent = show

      const pluralizeName = pluralize(name, 1)

      if (ListComponent) {
        routesRef.current.push({
          exact: true,
          path: route ?? `${routePath}/${name}`,
          component: () => (
            <ListComponent
              resourceName={name}
              canCreate={canCreate}
              canDelete={canDelete}
              canEdit={canEdit}
              canShow={canShow}
            />
          ),
        })
      }

      if (CreateComponent) {
        routesRef.current.push({
          exact: true,
          path: route ?? `${routePath}/${pluralizeName}/create`,
          component: () => (
            <CreateComponent
              resourceName={name}
              canCreate={canCreate}
              canDelete={canDelete}
              canEdit={canEdit}
              canShow={canShow}
            />
          ),
        })
      }

      if (EditComponent) {
        routesRef.current.push({
          exact: true,
          path: route ?? `${routePath}/${pluralizeName}/edit/:id`,
          component: () => (
            <EditComponent
              resourceName={pluralizeName}
              canCreate={canCreate}
              canDelete={canDelete}
              canEdit={canEdit}
              canShow={canShow}
            />
          ),
        })
      }

      if (ShowComponent) {
        routesRef.current.push({
          exact: true,
          path: route ?? `${routePath}/${pluralizeName}/view/:id`,
          component: () => (
            <ShowComponent
              resourceName={name}
              canCreate={canCreate}
              canDelete={canDelete}
              canEdit={canEdit}
              canShow={canShow}
            />
          ),
        })
      }

      if (PureComponent) {
        routesRef.current.push({
          exact: true,
          path: route ?? `${routePath}/${name}`,
          component: () => (
            <PureComponent
              resourceName={name}
              canCreate={canCreate}
              canDelete={canDelete}
              canEdit={canEdit}
              canShow={canShow}
            />
          ),
        })
      }

      setRoutesList(routesRef.current)
      setIsMenuReady(true)
    },
    [routePath]
  )
  console.log('routesList', routesList)

  useEffect(() => {
    if (currentResources) {
      currentResources.map((resource) => RouteHandler(resource))
    }
  }, [RouteHandler, currentResources])

  return (
    <Switch>
      {routesList.map((route, i) => {
        return (
          <Route
            key={i}
            exact={route.exact}
            path={route.path}
            component={route.component}
          />
        )
      })}

      {isMenuReady && (
        <RouteHook
          component={NotFoundPage ?? DefaultNotFoundPage}
          path="*"
          onEnter={console.log}
        />
      )}
    </Switch>
  )
}

export default RouteComponent
