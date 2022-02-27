/* eslint-disable react/no-children-prop */
import React from 'react'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { AuthProvider, useAuth } from '@redwoodjs/auth'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import { ThemeProvider } from '@material-ui/styles'
import Themes from './themes'
import { CssBaseline } from '@material-ui/core'
import { AuthClient, AuthMiddleware } from 'src/libs/auth'
import { GqlRouter } from 'src/libs/gql-router/contexts'
import { adminTypes, clientTypes, resources } from './resources'
import { ContextProvider as AppProvider } from 'src/store'
import Layout from 'src/layouts/layout'

import './scaffold.css'
import './index.css'
import LoginPage from './pages/Authorization/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import RegisterPage from './pages/Authorization/RegisterPage'

const access = {
  admin: adminTypes,
  customer: clientTypes,
}

const additionalRoutes = [
  {
    path: '/register',
    exact: true,
    component: RegisterPage,
  },
]

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider client={AuthClient} type="custom">
        <RedwoodApolloProvider graphQLClientConfig={AuthMiddleware()}>
          <AppProvider>
            <ThemeProvider theme={Themes.default}>
              <CssBaseline />

              <GqlRouter
                basePath="/app"
                access={access}
                resources={resources}
                routes={additionalRoutes}
                useAuth={useAuth}
                layout={Layout}
                loginPage={LoginPage}
                notFoundPage={NotFoundPage}
              />
            </ThemeProvider>
          </AppProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
