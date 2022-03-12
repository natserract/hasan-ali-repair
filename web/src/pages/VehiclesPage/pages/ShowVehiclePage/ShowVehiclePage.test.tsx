import { render } from '@redwoodjs/testing/web'

import ShowVehiclePage from './ShowVehiclePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ShowVehiclePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShowVehiclePage />)
    }).not.toThrow()
  })
})
