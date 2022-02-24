import { useCallback, useEffect, useRef, useState } from "react";
import { useResource } from "src/libs/gql-router/resource/hooks";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import { IResource } from "src/libs/gql-router/resource/types";
import NotFoundPage from 'src/pages/NotFoundPage'

type RouteHandlerInput = IResource

const RoutesHandler = () => {
  const { resources } = useResource();

  const routesRef = useRef([])
  const [routesList, setRoutesList] = useState([])

  const RouteHandler = useCallback((input: RouteHandlerInput) => {
    const {
      create,
      edit,
      list,
      pure,
      show,
      canDelete,
      route,
      name,
    } = input

    const PureComponent = pure;
    const ListComponent = list;
    const CreateComponent = create;
    const EditComponent = edit;
    const ShowComponent = show;

    if (ListComponent) {
      routesRef.current.push({
        exact: true,
        path: route ?? `/app/${name}`,
        component: () => (
          <div>
            {/* TODO: Table List */}
            <h2>List Wrapper</h2>

            <ListComponent
              name={name}
            />
          </div>
        ),
      });
    }

    if (PureComponent) {
      routesRef.current.push({
        exact: true,
        path: route ?? `/app/${name}`,
        component: () => (
          <PureComponent
            name={name}
          />
        ),
      });
    }

    setRoutesList(routesRef.current)
  }, [])

  useEffect(() => {
    resources.map(item => {
      RouteHandler(item)
    })
  }, [resources])

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
    </Switch>
  )
}

export default RoutesHandler;
