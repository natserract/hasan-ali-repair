import { render } from '@redwoodjs/testing/web'

import PartsPage from './PartsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PartsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PartsPage />)
    }).not.toThrow()
  })
})
