import { browserHistory } from '../utils/history'
import { History } from 'history'

type UseNavigateReturn = Pick<
  History,
  'go' | 'goBack' | 'push' | 'replace' | 'createHref'
>

const useNavigate = (): UseNavigateReturn => {
  return {
    push: browserHistory.push,
    go: browserHistory.go,
    goBack: browserHistory.goBack,
    replace: browserHistory.replace,
    createHref: browserHistory.createHref,
  }
}

export { useNavigate }
