import { IResource } from './libs/gql-router/resource/types'

// Icons
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Motorcycle as MotorcycleIcon,
  BusinessCenter as BusinessCenterIcon,
  EmojiPeople as EmojiPeopleIcon,
} from '@material-ui/icons'

// Pages
import DashboardPage from './pages/DashboardPage'
import UsersPage from './pages/UsersPage'
import ServicesPage from './pages/ServicesPage/ServicesPage'
import VehiclesPage from './pages/VehiclesPage/VehiclesPage'
import PartsPage from './pages/PartsPage/PartsPage'
import MechanicsPage from './pages/MechanicsPage/MechanicsPage'

const adminTypes = [
  'dashboard',
  'users',
  'vehicles',
  'services',
  'parts',
  'mechanics',
]

const clientTypes = ['dashboard', 'books', 'services']

const resources: IResource[] = [
  {
    name: 'dashboard',
    pure: DashboardPage,
    icon: <HomeIcon />,
  },
  {
    name: 'users',
    list: UsersPage,
    icon: <PeopleIcon />,
  },
  {
    name: 'services',
    list: ServicesPage,
    icon: <SettingsIcon />,
  },
  {
    name: 'vehicles',
    list: VehiclesPage,
    icon: <MotorcycleIcon />,
  },
  {
    name: 'parts',
    list: PartsPage,
    icon: <BusinessCenterIcon />,
  },
  {
    name: 'mechanics',
    list: MechanicsPage,
    icon: <EmojiPeopleIcon />,
  },
]
export { resources, adminTypes, clientTypes }
