import { browserHistory } from '../utils/history'
import { History } from 'history'

type KeyHistory = Pick<History, 'go' | 'push' | 'replace' | 'createHref'>

const useNavigate = (): KeyHistory => {
  return {
    push: browserHistory.push,
    go: browserHistory.go,
    replace: browserHistory.replace,
    createHref: browserHistory.createHref,
  }
}

export { useNavigate }
