import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { browserHistory } from './utils/history'
import { PublicRoute, PrivateRoute, RouteHook } from 'src/routes'
import NotFoundPage from 'src/pages/NotFoundPage'
import Login from 'src/pages/Authorization/LoginPage'
import Register from 'src/pages/Authorization/RegisterPage'
import Layout from 'src/layouts/layout'

const RoutesHandler = () => {
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />} />
        <PrivateRoute isAuthenticated={true} path="/app" component={Layout} />
        <PublicRoute isAuthenticated={true} path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <RouteHook component={NotFoundPage} path="*" onEnter={console.log} />
      </Switch>
    </Router>
  )
}

export default RoutesHandler;
