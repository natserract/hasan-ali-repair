/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { AuthContextInterface, RoutesProps } from '../../types/share'
import { PublicRoute, PrivateRoute, RouteHook } from '../../helpers/routes'
import RouteComponent from './routeComponent'
import { useResource } from '..'
import { History } from 'history'

// Default pages
import DefaultNotFoundPage from '../../pages/notfound'
import DefaultLoginPage from '../../pages/login'

// Default layout
import DefaultLayout from '../../layouts'
import { browserHistory } from '../../utils/history'

export type RoutesProviderProps = {
  useAuth: () => AuthContextInterface
  Layout: React.ComponentType<{
    children: React.ReactNode
  }>
  basePath?: string
  customRouteComponent?: () => JSX.Element
  LoginPage?: React.ComponentType<{}>
  NotFoundPage?: React.ComponentType<{}>
  history?: History
  routes?: RoutesProps[]
}

const RoutesProvider: React.FC<RoutesProviderProps> = (props) => {
  const {
    basePath,
    useAuth,
    Layout,
    LoginPage,
    customRouteComponent: CustomRouteComponent,
    NotFoundPage,
    history,
    routes,
  } = props

  const { isAuthenticated } = useAuth()
  const { resources } = useResource()

  const rootResource = resources[0]?.name
  const routePath = basePath ?? ``

  const ComponentInner = () => {
    if (!Layout) return DefaultLayout

    return (
      <Layout>
        <RouteComponent
          basePath={basePath ?? routePath}
          NotFoundPage={NotFoundPage ?? DefaultNotFoundPage}
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
        <Route
          exact
          path="/"
          render={() => (
            <Redirect
              to={basePath ? `${basePath}/${rootResource}` : `/${rootResource}`}
            />
          )}
        />
        {basePath && (
          <Route
            exact
            path={basePath}
            render={() => <Redirect to={`${basePath}/${rootResource}`} />}
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
