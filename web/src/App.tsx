import { AuthProvider } from '@redwoodjs/auth'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import { ThemeProvider } from "@material-ui/styles";
import Themes from "./themes";
import { CssBaseline } from "@material-ui/core";
import RoutesHandler from './RoutesHandler';

import { dbAuth } from '@redwoodjs/auth/dist/authClients/dbAuth';
import { createAuthClient } from '@redwoodjs/auth/dist/authClients';
import './scaffold.css'
import './index.css'

const authClient = createAuthClient({}, "dbAuth")

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider type="dbAuth">
        <RedwoodApolloProvider>
          <ThemeProvider theme={Themes.default}>
            <CssBaseline />
            <RoutesHandler />
          </ThemeProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
