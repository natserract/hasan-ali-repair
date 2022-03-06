import { render } from '@redwoodjs/testing/web'

import ShowSchedulePage from './ShowSchedulePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ShowSchedulePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShowSchedulePage />)
    }).not.toThrow()
  })
})
