import { Location } from 'history'
import { browserHistory } from '../utils/history'

type UseLocationReturn = Location

const useLocation = (): UseLocationReturn => {
  return browserHistory.location
}

export { useLocation }
