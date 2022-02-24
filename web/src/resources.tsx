import { IResource } from "./libs/gql-router/resource/types"

// Icons
import {
  Home as HomeIcon,
  People as PeopleIcon
} from "@material-ui/icons";

// Pages
import DashboardPage from "./pages/DashboardPage"
import UsersPage from "./pages/UsersPage"

const resources: IResource[] = [
  {
    name: "dashboard",
    pure: DashboardPage,
    icon: <HomeIcon />
  },
  {
     name: "users",
     list: UsersPage,
     icon: <PeopleIcon />
  },
]
export default resources
