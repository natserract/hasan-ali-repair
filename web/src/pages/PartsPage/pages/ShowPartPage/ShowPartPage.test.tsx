import { render } from '@redwoodjs/testing/web'

import ShowPartPage from './ShowPartPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ShowPartPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShowPartPage />)
    }).not.toThrow()
  })
})
