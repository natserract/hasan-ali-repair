// Route Strategy and Lifecycle
import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

type RouteHookProps = {
  onEnter: (props: RouteProps) => void
} & RouteProps

export class RouteHook extends React.Component<RouteHookProps> {
  get routeProps() {
    const { ...restProps } = this.props

    return restProps
  }

  componentDidMount() {
    if (this.props.onEnter) {
      this.props.onEnter(this.routeProps)
    }
  }

  render() {
    return <Route {...this.routeProps} />
  }
}
