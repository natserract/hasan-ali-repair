import { render } from '@redwoodjs/testing/web'

import ShowServicePage from './ShowServicePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ShowServicePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShowServicePage />)
    }).not.toThrow()
  })
})
