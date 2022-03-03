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

export function GqlRouter<T>(props: GqlRouterProps<T>) {
  const {
    children,
    resources,
    access,
    routes,
    useAuth,
    basePath,
    customRouteComponent,
    Layout,
    LoginPage,
    NotFoundPage,
    history,
  } = props

  return (
    <AccessControlContextProvider access={access}>
      <ResourceContextProvider resources={resources}>
        <RoutesProvider
          useAuth={useAuth}
          basePath={basePath}
          customRouteComponent={customRouteComponent}
          Layout={Layout}
          LoginPage={LoginPage}
          NotFoundPage={NotFoundPage}
          history={history}
          routes={routes}
          // eslint-disable-next-line react/no-children-prop
          children={children}
        />
      </ResourceContextProvider>
    </AccessControlContextProvider>
  )
}
