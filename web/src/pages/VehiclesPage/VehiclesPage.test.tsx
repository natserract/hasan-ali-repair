import { render } from '@redwoodjs/testing/web'

import VehiclesPage from './VehiclesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('VehiclesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VehiclesPage />)
    }).not.toThrow()
  })
})
