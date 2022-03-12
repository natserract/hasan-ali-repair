import { render } from '@redwoodjs/testing/web'

import EditVehiclePage from './EditVehiclePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EditVehiclePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditVehiclePage />)
    }).not.toThrow()
  })
})
