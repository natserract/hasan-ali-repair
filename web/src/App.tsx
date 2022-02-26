import React from 'react'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { AuthProvider } from '@redwoodjs/auth'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import { ThemeProvider } from '@material-ui/styles'
import Themes from './themes'
import { CssBaseline } from '@material-ui/core'
import RoutesHandler from './RoutesHandler'
import { AuthClient, AuthMiddleware } from 'src/libs/auth'
import { GqlRouter } from 'src/libs/gql-router'
import { resources } from './resources'
import { ContextProvider } from 'src/store'

import './scaffold.css'
import './index.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider client={AuthClient} type="custom">
        <RedwoodApolloProvider graphQLClientConfig={AuthMiddleware()}>
          <GqlRouter resources={resources}>
            <ContextProvider>
              <ThemeProvider theme={Themes.default}>
                <CssBaseline />
                <RoutesHandler />
              </ThemeProvider>
            </ContextProvider>
          </GqlRouter>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
