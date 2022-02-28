import { browserHistory } from '../utils/history'
import { History } from 'history'

type KeyHistory = Pick<
  History,
  'go' | 'goBack' | 'push' | 'replace' | 'createHref'
>

const useNavigate = (): KeyHistory => {
  return {
    push: browserHistory.push,
    go: browserHistory.go,
    goBack: browserHistory.goBack,
    replace: browserHistory.replace,
    createHref: browserHistory.createHref,
  }
}

export { useNavigate }
