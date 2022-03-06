// Icons
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Motorcycle as MotorcycleIcon,
  BusinessCenter as BusinessCenterIcon,
  EmojiPeople as EmojiPeopleIcon,
  AvTimer as AvTimerIcon,
  GroupWork as GroupWorkIcon,
} from '@material-ui/icons'

// Pages
import DashboardPage from './pages/DashboardPage'
import UsersPage from './pages/UsersPage'
import ServicesPage from './pages/ServicesPage/ServicesPage'
import VehiclesPage from './pages/VehiclesPage/VehiclesPage'
import PartsPage from './pages/PartsPage/PartsPage'
import MechanicsPage from './pages/MechanicsPage/MechanicsPage'
import EditUserPage from './pages/UsersPage/pages/EditUserPage/EditUserPage'
import CreateUserPage from './pages/UsersPage/pages/CreateUserPage/CreateUserPage'
import ShowUserPage from './pages/UsersPage/pages/ShowUserPage/ShowUserPage'
import { IResourceItem } from './libs/gql-router'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ShowServicePage from './pages/ServicesPage/pages/ShowServicePage/ShowServicePage'
import SchedulesPage from './pages/SchedulesPage'
import CreateServicePage from './pages/ServicesPage/pages/CreateServicePage/CreateServicePage'
import EditServicePage from './pages/ServicesPage/pages/EditServicePage/EditServicePage'
import PartsUsedPage from './pages/PartsUsedPage/PartsUsedPage'
import ShowSchedulePage from './pages/SchedulesPage/pages/ShowSchedulePage/ShowSchedulePage'
import CreateSchedulePage from './pages/SchedulesPage/pages/CreateSchedulePage/CreateSchedulePage'

const adminAccess = [
  'dashboard',
  'users',
  'vehicles',
  'services',
  'parts',
  'mechanics',
  'register',
  'profiles',
  'schedules',
  'used-parts',
]
const clientAccess = [
  'dashboard',
  'register',
  'services',
  'profiles',
  'schedules',
  'vehicles',
]

const resources: IResourceItem[] = [
  {
    name: 'dashboard',
    pure: DashboardPage,
    icon: <HomeIcon />,
  },
  {
    name: 'users',
    list: UsersPage,
    edit: EditUserPage,
    create: CreateUserPage,
    show: ShowUserPage,
    icon: <PeopleIcon />,
  },
  {
    name: 'schedules',
    label: 'Bookings',
    list: SchedulesPage,
    show: ShowSchedulePage,
    create: CreateSchedulePage,
    icon: <AvTimerIcon />,
  },
  {
    name: 'services',
    list: ServicesPage,
    show: ShowServicePage,
    create: CreateServicePage,
    edit: EditServicePage,
    icon: <SettingsIcon />,
  },
  {
    name: 'used-parts',
    label: 'Parts Used',
    list: PartsUsedPage,
    icon: <GroupWorkIcon />,
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
  {
    name: 'profiles',
    route: '/app/profile',
    pure: ProfilePage,
  },
]
export { resources, adminAccess as adminTypes, clientAccess as clientTypes }
