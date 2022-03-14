import { render } from '@redwoodjs/testing/web'

import EditPartPage from './EditPartPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EditPartPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditPartPage />)
    }).not.toThrow()
  })
})
