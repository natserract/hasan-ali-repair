import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { AuthProvider } from '@redwoodjs/auth'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import * as firebaseAuth from '@firebase/auth'
import { firebaseConfig } from './config/firebase'
import { initializeApp, getApp, getApps } from 'firebase/app'
import { ThemeProvider } from "@material-ui/styles";
import Themes from "./themes";
import { CssBaseline } from "@material-ui/core";
import RoutesHandler from './RoutesHandler';

import './index.css'

const firebaseApp = ((config) => {
  const apps = getApps()
  if (!apps.length) {
    initializeApp(config)
  }
  return getApp()
})(firebaseConfig)

const firebaseClient = {
  firebaseAuth,
  firebaseApp,
}

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider client={firebaseClient} type="firebase">
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
