import { render } from '@redwoodjs/testing/web'

import EditMechanicPage from './EditMechanicPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EditMechanicPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditMechanicPage />)
    }).not.toThrow()
  })
})
