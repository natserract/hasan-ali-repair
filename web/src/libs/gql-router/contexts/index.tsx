import { ResourceContextProvider } from './resource/context'
import { AccessControlContextProvider } from './access/context'
import { IResourceContext } from './resource/types'
import { IAccessControlContext } from './access/types'
import RoutesProvider, { RoutesProviderProps } from './routes/provider'

export * from './access'
export * from './resource'

type BaseProps = {
  children?: React.ReactNode
}

type ContextProps<T> = IResourceContext &
  Partial<IAccessControlContext<T>> &
  RoutesProviderProps
type GqlRouterProps<T> = BaseProps & ContextProps<T>

export function GqlRouter<T>({
  children,
  resources,
  access,
  useAuth,
  basePath,
  customRouteComponent,
  layout,
  loginPage,
  notFoundPage,
  history,
}: GqlRouterProps<T>) {
  return (
    <AccessControlContextProvider access={access}>
      <ResourceContextProvider resources={resources}>
        <RoutesProvider
          useAuth={useAuth}
          basePath={basePath}
          customRouteComponent={customRouteComponent}
          layout={layout}
          loginPage={loginPage}
          notFoundPage={notFoundPage}
          history={history}
        >
          {children}
        </RoutesProvider>
      </ResourceContextProvider>
    </AccessControlContextProvider>
  )
}
