import { render } from '@redwoodjs/testing/web'

import PartsUsedPage from './PartsUsedPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PartsUsedPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PartsUsedPage />)
    }).not.toThrow()
  })
})
