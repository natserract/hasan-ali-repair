import { render } from '@redwoodjs/testing/web'

import CreateVehiclePage from './CreateVehiclePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CreateVehiclePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateVehiclePage />)
    }).not.toThrow()
  })
})
