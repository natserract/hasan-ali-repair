import React from 'react'
import {
  Route,
  RouteProps,
  RouteComponentProps,
  Redirect,
} from 'react-router-dom'
import { LocationDescriptor } from 'history'

type PrivateRouteProps = {
  isAuthenticated: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
  redirectTo?: LocationDescriptor
} & RouteProps

export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const {
    isAuthenticated,
    redirectTo,
    component: Component,
    ...restProps
  } = props

  return (
    <Route
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />
        }

        const defaultRedirectTo: LocationDescriptor = {
          pathname: '/login',
          state: { nextPathname: props.location.pathname },
        }

        return <Redirect to={redirectTo || defaultRedirectTo} />
      }}
      {...restProps}
    />
  )
}
