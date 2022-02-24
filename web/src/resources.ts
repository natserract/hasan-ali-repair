import { IResource } from "./libs/gql-router/resource/types"
import DashboardPage from "./pages/DashboardPage"
import UsersPage from "./pages/UsersPage/UsersPage"

const resources: IResource[] = [
  {
     name: "users",
     list: UsersPage
  },
  {
    name: "dashboard",
    pure: DashboardPage,
  }
]
export default resources
