/* eslint-disable react/no-children-prop */
/* eslint-disable prettier/prettier */
import { useCallback, useEffect, useRef, useState } from "react"
import { IResource, useResource } from "../resource"
import pluralize from 'pluralize'
import { Route, Switch } from 'react-router-dom'
import { useAccess } from ".."
import { RouteHook } from "../../components/routes"
import DefaultNotFoundPage from "../../pages/notfound"

type RouteHandlerInput = IResource

type RouteComponentProps = {
  notFoundPage?: React.ComponentType<{}>;
}

const RouteComponent: React.FC<RouteComponentProps> = ({
  notFoundPage: NotFoundPage,
}) => {
  const { resources } = useResource()
  const { currentRole, access } = useAccess()

  const routesRef = useRef([])
  const [routesList, setRoutesList] = useState([])
  const [isMenuReady, setIsMenuReady] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const RouteHandler = (input: RouteHandlerInput) => {
    console.log('input', input)
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
        path: route ?? `/app/${name}`,
        component: () => (
          <ListComponent
            name={name}
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
        path: route ?? `/app/${pluralizeName}/create`,
        component: () => (
          <CreateComponent
            name={name}
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
        path: route ?? `/app/${pluralizeName}/edit`,
        component: () => (
          <EditComponent
            name={pluralizeName}
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
        path: route ?? `/app/${pluralizeName}/view/:id`,
        component: () => (
          <ShowComponent
            name={name}
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
        path: route ?? `/app/${name}`,
        component: () => <PureComponent name={name} />,
      })
    }

    setRoutesList(routesRef.current)
    setIsMenuReady(true)
  }

  useEffect(() => {
    if (currentRole) {
      const currentResources = resources.filter((item) => {
        let entries: string[] = []
        Object.entries(access).forEach(([key, values]) => {
          if (key == currentRole) {
            entries = values as string[]
          }
        })

        return entries.includes(item.name)
      })

      if (currentResources.length) {
        currentResources.map((resource) => RouteHandler(resource))
      }
    }
  }, [RouteHandler, access, currentRole, resources])

  console.log('routesList', routesList)
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
        <RouteHook component={NotFoundPage ?? DefaultNotFoundPage} path="*" onEnter={console.log} />
      )}
    </Switch>
  )
}

export default RouteComponent
