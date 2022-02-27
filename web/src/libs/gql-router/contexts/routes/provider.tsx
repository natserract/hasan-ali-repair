/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { AuthContextInterface, RoutesProps } from '../../types/share'
import { PublicRoute, PrivateRoute, RouteHook } from '../../components/routes'
import RouteComponent from './routeComponent'
import { useResource } from '..'
import { History } from 'history'

// Default pages
import DefaultNotFoundPage from '../../pages/notfound'
import DefaultLoginPage from '../../pages/login'

// Default layout
import DefaultLayout from '../layouts'
import { browserHistory } from '../../utils/history'

export type RoutesProviderProps = {
  useAuth: () => AuthContextInterface
  layout: React.ComponentType<{}>
  basePath?: string
  customRouteComponent?: () => JSX.Element
  loginPage?: React.ComponentType<{}>
  notFoundPage?: React.ComponentType<{}>
  history?: History
  routes?: RoutesProps[]
}

const RoutesProvider: React.FC<RoutesProviderProps> = (props) => {
  const {
    basePath,
    useAuth,
    layout: Layout,
    loginPage: LoginPage,
    customRouteComponent: CustomRouteComponent,
    notFoundPage: NotFoundPage,
    history,
    routes,
  } = props

  const { isAuthenticated } = useAuth()
  const { resources } = useResource()

  const mainRoute = resources[0]?.name || 'dashboard'
  const routePath = (basePath + '/' ?? '/') + mainRoute

  const ComponentInner = () => {
    if (!Layout) return DefaultLayout

    return (
      <Layout>
        <RouteComponent
          basePath={basePath}
          notFoundPage={NotFoundPage ?? DefaultNotFoundPage}
        />
      </Layout>
    )
  }

  const renderAdditionalRoutes = () => {
    if (!routes && !routes.length) return <React.Fragment />

    return routes.map((route, i) => {
      const Component = route.component

      return (
        <Route
          key={i}
          exact={route.exact}
          path={route.path}
          component={Component}
        />
      )
    })
  }

  if (CustomRouteComponent) return <CustomRouteComponent />

  return (
    <Router history={history ?? browserHistory}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to={routePath} />} />
        {basePath && (
          <Route
            exact
            path={basePath}
            render={() => <Redirect to={routePath} />}
          />
        )}

        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path={basePath ?? routePath}
          component={ComponentInner}
        />

        <PublicRoute
          isAuthenticated={isAuthenticated}
          path="/login"
          component={LoginPage ?? DefaultLoginPage}
        />

        {renderAdditionalRoutes()}

        <RouteHook
          component={NotFoundPage ?? DefaultNotFoundPage}
          path="*"
          onEnter={console.log}
        />
      </Switch>
    </Router>
  )
}

export default RoutesProvider
