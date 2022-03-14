// Icons
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Motorcycle as MotorcycleIcon,
  BusinessCenter as BusinessCenterIcon,
  EmojiPeople as EmojiPeopleIcon,
  AvTimer as AvTimerIcon,
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
import ShowSchedulePage from './pages/SchedulesPage/pages/ShowSchedulePage/ShowSchedulePage'
import CreateSchedulePage from './pages/SchedulesPage/pages/CreateSchedulePage/CreateSchedulePage'
import EditSchedulePage from './pages/SchedulesPage/pages/EditSchedulePage/EditSchedulePage'
import EditVehiclePage from './pages/VehiclesPage/pages/EditVehiclePage/EditVehiclePage'
import ShowVehiclePage from './pages/VehiclesPage/pages/ShowVehiclePage/ShowVehiclePage'
import CreateVehiclePage from './pages/VehiclesPage/pages/CreateVehiclePage/CreateVehiclePage'
import CreatePartPage from './pages/PartsPage/pages/CreatePartPage/CreatePartPage'
import EditPartPage from './pages/PartsPage/pages/EditPartPage/EditPartPage'
import ShowPartPage from './pages/PartsPage/pages/ShowPartPage/ShowPartPage'
import FaqPage from './pages/FaqPage/FaqPage'
import EditMechanicPage from './pages/MechanicsPage/pages/EditMechanicPage/EditMechanicPage'
import ShowMechanicPage from './pages/MechanicsPage/pages/ShowMechanicPage/ShowMechanicPage'
import CreateMechanicPage from './pages/MechanicsPage/pages/CreateMechanicPage/CreateMechanicPage'

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
  'faq',
]
const clientAccess = [
  'dashboard',
  'register',
  'services',
  'profiles',
  'schedules',
  'vehicles',
  'faq',
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
    edit: EditSchedulePage,
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
    name: 'vehicles',
    list: VehiclesPage,
    create: CreateVehiclePage,
    edit: EditVehiclePage,
    show: ShowVehiclePage,
    icon: <MotorcycleIcon />,
  },
  {
    name: 'parts',
    list: PartsPage,
    create: CreatePartPage,
    edit: EditPartPage,
    show: ShowPartPage,
    icon: <BusinessCenterIcon />,
  },
  {
    name: 'mechanics',
    list: MechanicsPage,
    edit: EditMechanicPage,
    show: ShowMechanicPage,
    create: CreateMechanicPage,
    icon: <EmojiPeopleIcon />,
  },
  {
    name: 'profiles',
    route: '/app/profile',
    pure: ProfilePage,
  },
  {
    name: 'faq',
    route: '/app/faq',
    pure: FaqPage,
  },
]
export { resources, adminAccess as adminTypes, clientAccess as clientTypes }
